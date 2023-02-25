const axios = require('axios');
const ExperimentRepository = require('../repositories/experimentRepository');
const experimentRepository = new ExperimentRepository();
const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();
const Logger = require("abtest-logger");
const logger = new Logger("amqps://qdniwzza:a-yzSrHM7aPJ-ySEYMc7trjzvs00QJ5b@rattlesnake.rmq.cloudamqp.com/qdniwzza");


const growthRender = "https://ab-test-bvtg.onrender.com/";

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
    console.log(details);
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
        let access = checkManagerAuth(details);
        access = true; //until IAM Integration
        if (access) {
            await axios.post(`${growthRender}experiments/new`, req.body)

                .then(async response => {
                    logger.info("creating experiment using Growth API");
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
                    logger.error("Failed to create experiment using Growth API");
                    res.status(404).json("Failed to create experiment using Growth API");
                })
        }
        else {
            logger.info("user not authorised for creating experiment");
            res.send("you don't have permission to create experiment")
        }

    },
    async updateExperiment(req, res) {
        const details = await getDetails(req);
        let access = checkManagerAuth(details);
        access = true; //until IAM Integration
        if (access) {
            await axios.put(`${growthRender}experiments/${req.params.id}`, req.body)

                .then(response => {
                    logger.info("updating experiment using Growth");
                    res.status(200).json(response.data);
                })
                .catch(mock => {
                    logger.error("Failed to update experiment using Growth API");
                    res.status(404).json("Failed to update experiment using Growth API");
                })
        }
        else {
            logger.info("user not authorised for updating experiment");
            res.status(500).json( { mass: "you don't have permission to update experiment" })
        }
    },
    async terminateExperiment(req, res) {
        const details = await getDetails(req);
        let access = checkManagerAuth(details);
        access = true; //until IAM Integration
        if (access) {
            await axios.put(`${growthRender}experiments/terminate/${req.params.id}`, {})
                .then(response => {
                    logger.info("ending experiment using Growth");
                    res.status(200).send(response.data);
                })
                .catch(error => {
                    logger.error("Failed to terminate experiment from Growth API");
                    res.status(404).json("Failed to terminate experiment from Growth API");
                })
        }
        else {
            logger.info("user not authorised for ending experiment");
            res.send("you don't have permission to end experiment")
        }
    },
    async experimentsByAccount(req, res) {
        let status = getToken(req);
        if(status) {
            await axios.get(`${growthRender}experiments/account/${req.params.account}`)
                .then(response => {
                    logger.info("getting experiments by account from Growth");
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
            await axios.get(`${growthRender}experiments/AB/${req.params.account}`)
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
            await axios.get(`${growthRender}experiments/FF/${req.params.account}`)
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
                res.status(200).send("declared goal");
            })
            .catch(mock => {
                logger.log("get experiment id using mock data");
                const experiment = experimentRepository.getExperimentById(req.params.id);
                res.status(200).json(experiment);
            })

    },
    async getExperimentById(req, res) {
        await axios.get(`${growthRender}experiments/${req.params.id}`)
            .then(response => {
                logger.info("get experiment by Id using Growth");
                res.status(200).json(response.data);
            })
            .catch(mock => {
                logger.info("get experiment id using mock data");
                const experiment = experimentRepository.getExperimentById(req.params.id);
                res.status(200).json(experiment);
            })
    },
    async getVariantExposeById(req, res) {
        await axios.get(`${growthRender}/goal/variantCount/${req.params.id}`)
            .then(response => {
                logger.info("get experiment variant count using Growth");
                res.status(200).json(response.data);
            })
            .catch(mock => {
                logger.info("get experiment variant count using mock");
                res.status(200).json("mock");
            })
    },
    async getVariantSuccessById(req, res) {
        await axios.get(`${growthRender}stats/variantSuccessCount/${req.params.id}/${req.params.gid}`)
            .then(response => {
                logger.info("get variant success count by ID using Growth");
                res.status(200).json(response.data);
            })
            .catch(error => {
                logger.error("Failed to get variant success count from Growth API");
                res.status(404).json("Failed to get variant success count from Growth API");
            })
    },
    async getRequestPerAttributeById(req, res) {
        await axios.get(`${growthRender}stats/reqPerAtt/${req.params.id}`)
            .then(response => {
                logger.info("get Request per attribute by ID using Growth");
                res.status(200).json(response.data);
            })
            .catch(error => {
                logger.error("Failed to get Request per attribute from Growth API");
                res.status(404).json("Failed to get Request per attribute from Growth API");
            })
    },
    async experimentCallsByAccount(req, res) {
        await axios.get(`${growthRender}stats/testsPerMonth/${req.params.id}`)
            .then(response => {
                logger.info("get experiment calls per month by ID using Growth API");
                res.status(200).json(response.data);
            })
            .catch(error => {
                logger.error("Failed get experiment calls per month by ID using Growth API");
                res.status(404).json("Failed get experiment calls per month by ID using Growth API");
            })
    }
}
