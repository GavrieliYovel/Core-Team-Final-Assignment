const axios = require('axios');
const ExperimentRepository = require('../repositories/experimentRepository');
const experimentRepository = new ExperimentRepository();
const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();
const Logger = require("abtest-logger");
const logger = new Logger('mongodb+srv://coreteam:bVZR3Is9VfhlDFv1@cluster0.1cxlyo9.mongodb.net/logger?retryWrites=true&w=majority');

function checkManagerAuth(details) {
    return !(details.type !== "manager" || details.credits <= 0);
}

async function getDetails(req) {
    let details;
    //getting type, credits, plan assets from IAM
    await axios.get('https://am-shenkar.onrender.com/assets', {headers: {'Content-Type': 'application/json'}})
        .then(response => {
            logger.info("getting user details from IAM");
            details = response.data;
        })
        .catch(mock => {
            logger.info("getting user details from mock data");
            details = userRepository.getDetailsById(req.session.userId);
        })
    return details;
}

async function getToken(req){
    let status;
    await axios.get('https://am-shenkar.onrender.com/assets/token', {headers: {'Content-Type': 'application/json'}})
        .then(response => {
            if('message' in response.data){
                logger.info("getting token from IAM");
                status = true;
            }
            else{
                logger.info("failed getting token from IAM");
                status = false;
            }
        })
        .catch(mock => {
            if('userId' in req.session) {
                logger.info("getting mock token from mock data");
                status = true;
            }
            else{
                logger.info("failed getting mock token from mock data");
                status = false;
            }
        })
    return status;
}


exports.experimentController = {
    async createExperiment(req, res) {
        const details = await getDetails(req);
        console.log(details);
        if (checkManagerAuth(details)) {
            await axios.post('https://ab-test-production.onrender.com/experiments/', req.body)
                .then(async response => {
                    logger.info("creating experiment using Growth");
                    await axios.put('https://am-shenkar.onrender.com/credits/1', {headers: {'Content-Type': 'application/json'}})
                        .then(response => {
                            logger.info("use 1 credit using IAM");
                            res.status(200).json(response.data);
                        })
                        .catch(mock => {
                            logger.info("use 1 credit using mock data");
                            const newAmount = userRepository.decreaseCredit(req.session.userId, 1);
                            logger.info(`new user credit amount ${newAmount}`);
                            res.status(200).json(response.data);
                        })
                })
                .catch(mock => {
                    logger.info("creating experiment using mock data");
                    logger.info("use 1 credit using mock data");
                    const newAmount = userRepository.decreaseCredit(req.session.userId, 1);
                    logger.info(`new user credit amount ${newAmount} using mock data`);
                    const id = experimentRepository.createExperiment(req.body);
                    const experiment = experimentRepository.getExperimentById(id);
                    res.status(200).json({
                        mode: "mock",
                        data: experiment
                    });
                })
        }
        else {
            logger.info("user not authorised for creating experiment");
            res.send("you don't have permission to create experiment")
        }

    },
    async updateExperiment(req, res) {
        const details = await getDetails(req);
        if (checkManagerAuth(details)) {
            await axios.put(`https://ab-test-production.onrender.com/experiments/${req.params.id}`, req.body)
                .then(response => {
                    logger.info("updating experiment using Growth");
                    res.status(200).json(response.data);
                })
                .catch(mock => {
                    logger.info("updating experiment using mock data");
                    const updatedExperiment = experimentRepository.updateExperiment(req.body, req.params.id);
                    res.status(200).json(updatedExperiment);
                })
        }
        else {
            logger.info("user not authorised for updating experiment");
            res.status(500).json( { mass: "you don't have permission to update experiment" })
        }
    },
    async experimentStatistics(req , res) {
        if(await getToken(req)) {
            await axios.get(`https://ab-test-production.onrender.com/stats/${req.params.id}`)
                .then(response => {

                    logger.info("getting experiment statistics using Growth");
                    res.send(response.data);
                })
                .catch(mock => {
                    logger.info("getting experiment statistics using mock data");
                    res.send(`Statistics data from experiment ${req.params.id}`);
                })
        } else {
            logger.info("experimentStatistics - must login first");
            res.send(`experimentStatistics - must login first`);

        }

    },
    async endExperiment(req, res) {
        const details = await getDetails(req);
        if (checkManagerAuth(details)) {
            await axios.post(`https://ab-test-production.onrender.com/end/${req.params.id}`, {
                experimentId: req.body.experimentId
            })
                .then(response => {
                    logger.info("ending experiment using Growth");
                    res.status(200).send(response.data);
                })
                .catch(mock => {
                    logger.info("ending experiment using mock data");
                    experimentRepository.endExperiment(req.params.id);
                    res.status(200).send(`experiment ${req.params.id} ended`);
                })
        }
        else {
            logger.info("user not authorised for ending experiment");
            res.send("you don't have permission to end experiment")
        }
    },
    async experimentsByAccount(req, res) {
        let status = getToken(req);
        console.log('check');
        if(status) {
            await axios.get(`https://ab-test-production.onrender.com/experiments/account/${req.params.account}`)
                .then(response => {
                    logger.info("getting experiments by account from Growth");
                    logger.debug("getting experiments by account from Growth");
                    logger.error("getting experiments by account from Growth");
                    res.status(200).json(response.data);
                })
                .catch(mock => {

                    logger.info("getting experiments by account from mock data");

                    const data = experimentRepository.getExperimentByAccount(req.params.account);
                    res.status(200).json(data);
                })
        }
        else {
            logger.info("user not authorised to get experiments by account");
            res.send("you don't have permissions");

        }
    },
    async ABTestExperimentsByAccount(req, res) {
        let status = getToken(req);
        if(status) {
            await axios.get(`https://ab-test-production.onrender.com/experiments/AB/${req.params.account}`)
                .then(response => {
                    logger.info("getting AB experiments by account from Growth");
                    res.status(200).json(response.data);
                })
                .catch(mock => {
                    logger.info("getting AB experiments by account from mock data");
                    const data = experimentRepository.getABTestByAccount(req.params.account);
                    res.status(200).json(data);
                })
        }
        else {
            logger.info("user not authorised to get experiments by account");
            res.send("you don't have permissions");
        }
    },
    async FeatureFlagExperimentsByAccount(req, res) {
        let status = getToken(req);
        if(status) {
            await axios.get(`https://ab-test-production.onrender.com/experiments/FF/${req.params.account}`)
                .then(response => {
                    logger.info("getting FF experiments by account from Growth");
                    res.status(200).json(response.data);
                })
                .catch(mock => {
                    logger.info("getting FF experiments by account from mock data");
                    const data = experimentRepository.getFeatureFlagByAccount(req.params.account);
                    res.status(200).json(data);
                })
        }
        else {
            logger.info("user not authorised to get experiments by account");
            res.send("you don't have permissions");
        }
    },
    async deleteExperiment(req, res) {
        const details = await getDetails(req);
        if (checkManagerAuth(details)) {
            await axios.delete(`https://ab-test-production.onrender.com/experiments/${req.body.id}`)
                .then(response => {
                    logger.info("deleting experiment using Growth");
                    res.status(200).json(response.data);
                })
                .catch(mock => {
                    logger.info("deleting experiment using mock data");
                    experimentRepository.deleteExperiment(req.body.id);
                    res.status(200).json(`experiment ${req.body.id} deleted`);
                })
        } else {
            logger.info("user not authorised to delete experiments");
            res.send("you don't have permissions");
        }
    },
    async callExperiment(req, res) {
        await axios.post(`https://ab-test-production.onrender.com/test/run`, req.body, req.headers)
            .then(response => {
                logger.info("calling experiment using Growth");
                res.status(200).json(response.data);
            })
            .catch(mock => {
                logger.info("calling experiment using mock data");
                const experiment = experimentRepository.getExperimentById(req.params.id);
                if(experiment) {
                    if (experiment.type == "a-b") {
                        Math.random() < 0.5 ? res.status(200).json(experiment.variant_ab.A) : res.status(200).json(experiment.variants.B);
                    } else {
                        Math.random() < 0.5 ? res.status(200).json(experiment.variants_ff.ON) : res.status(200).json(experiment.variants.OFF);
                    }
                } else {
                    logger.info("calling experiment - no such experiment");
                    res.send("no such experiment");
                }
            })
    },
    async declareGoal(req, res) {
        await axios.put(`https://growth.render.com/experiment/goal/${req.params.id}`, req.body)
            .then(response => {
                logger.info("declaring goal using Growth");
                res.status(200).json(response.data);
            })
            .catch(mock => {
                logger.info("declaring goal using mock data");
                experimentRepository.updateVariantCount(req.params.id, req.body.variant)
                res.status(200).send("declared goal");
            })
            .catch(mock => {
                logger.log("get experiment id using mock data");
                const experiment = experimentRepository.getExperimentById(req.params.id);
                res.status(200).json(experiment);
            })

    },
    async getExperimentById(req, res) {
        await axios.get(`https://ab-test-production.onrender.com/experiments/${req.params.id}`)
            .then(response => {
                logger.info("get experimentId using Growth");
                res.status(200).json(response.data);
            })
            .catch(mock => {
                logger.info("get experiment id using mock data");
                const experiment = experimentRepository.getExperimentById(req.params.id);
                res.status(200).json(experiment);
            })

    },
    async getVariantCountById(req, res) {
        await axios.get(`https://ab-test-production.onrender.com/goal/variantCount/${req.params.id}`)
            .then(response => {
                logger.info("get experiment variant count using Growth");
                res.status(200).json(response.data);
            })
            .catch(mock => {
                logger.info("get experiment variant count using mock");
                res.status(200).json(experimentRepository.getVariantCountById(req.params.id));
            })
    },
    async getCallCountById(req, res) {
        await axios.get(`https://ab-test-production.onrender.com/goal/callCount/${req.params.id}`)
            .then(response => {
                logger.info("get experiment call count using Growth");
                res.status(200).json(response.data);
            })
            .catch(mock => {
                logger.info("get experiment call count using mock");
                res.status(200).json(experimentRepository.getCallCountById(req.params.id));
            })
    }
}
