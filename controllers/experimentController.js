const axios = require('axios');
const ExperimentRepository = require('../repositories/experimentRepository');
const experimentRepository = new ExperimentRepository();
const UserRepository = require('../repositories/userRepository');
const {get} = require("axios");
const userRepository = new UserRepository();
const Logger = require("../logger/Logger");
const logger = new Logger();

function checkManagerAuth(details) {
    if(details.type !== "manager" || details.credits <= 0) {
        return false;
    } else {
        return true;
    }
}

async function getDetails(req) {
    let details;
    //getting type, credits, plan assets from IAM
    await axios.get('https://am-shenkar.onrender.com/assets', {headers: {'Content-Type': 'application/json'}})
        .then(response => {
            logger.log("getting user details from IAM");
            details = response.data;
        })
        .catch(mock => {
            logger.log("getting user details from mock data");
            details = userRepository.getDetailsById(req.session.userId);
        })
    return details;
}

async function getToken(req){
    let status;
    await axios.get('https://am-shenkar.onrender.com/assets/token', {headers: {'Content-Type': 'application/json'}})
        .then(response => {
            if('message' in response.data){
                logger.log("getting token from IAM");
                status = true;
            }
            else{
                logger.log("failed getting token from IAM");
                status = false;
            }
        })
        .catch(mock => {
            if('userId' in req.session) {
                logger.log("getting mock token from mock data");
                status = true;
            }
            else{
                logger.log("failed getting mock token from mock data");
                status = false;
            }
        })
    return status;
}


exports.experimentController = {
    async createExperiment(req, res) {
        const details = await getDetails(req);
        if (checkManagerAuth(details)) {
            await axios.post('https://growth.render.com/experiment/new', req.body)
                .then(async response => {
                    logger.log("creating experiment using Growth");
                    await axios.put('https://am-shenkar.onrender.com/credits/1', {headers: {'Content-Type': 'application/json'}})
                        .then(response => {
                            logger.log("use 1 credit using IAM");
                            res.send({
                                response: "success",
                                data: response.data
                            });
                        })
                        .catch(mock => {
                            logger.log("use 1 credit using mock data");
                            userRepository.decreaseCredit(req.session.userId, 1);
                            const id = experimentRepository.createExperiment(req.body);
                            const experiment = experimentRepository.getExperimentById(id);
                            res.send({
                                mode: "mock",
                                response: "success",
                                data: experiment
                            });
                        })
                })
                .catch(mock => {
                    logger.log("creating experiment using mock data");
                    const id = experimentRepository.createExperiment(req.body);
                    const experiment = experimentRepository.getExperimentById(id);
                    res.send({
                        mode: "mock",
                        response: "success",
                        data: experiment
                    });
                })
        }
        else {
            logger.log("user not authorised for creating experiment");
            res.send("you don't have permission to create experiment")
        }

    },
    async updateExperiment(req, res) {
        const details = await getDetails(req);
        if (checkManagerAuth(details)) {
            await axios.put(`https://growth.render.com/experiment/${req.params.id}`, req.body)
                .then(response => {
                    logger.log("updating experiment using Growth");
                    res.status(200).json(response.data);
                })
                .catch(mock => {
                    logger.log("updating experiment using mock data");
                    const updatedExperiment = experimentRepository.updateExperiment(req.body, req.params.id);
                    res.status(200).json(updatedExperiment);
                })
        }
        else {
            logger.log("user not authorised for updating experiment");
            res.status(500).json( { mass: "you don't have permission to update experiment" })
        }
    },
    async experimentStatistics(req , res) {
        await axios.get(`https://growth.render.com/experiment/${req.params.id}/statistics`)
            .then(response => {
                logger.log("getting experiment statistics using Growth");
                res.send(response.data);
            })
            .catch(mock => {
                logger.log("getting experiment statistics using mock data");
                res.send(`Statistics data from experiment ${req.params.id}`);
                res.render("manage.experiments");
            })
    },
    async endExperiment(req, res) {
        const details = await getDetails(req);
        if (checkManagerAuth(details)) {
            await axios.post(`https://growth.render.com/experiment/${req.params.id}/end`, {
                experimentId: req.body.experimentId
            })
                .then(response => {
                    logger.log("ending experiment using Growth");
                    res.send(response.data);
                })
                .catch(mock => {
                    logger.log("ending experiment using mock data");
                    experimentRepository.endExperiment(req.params.id);
                    res.send(`experiment ${req.params.id} ended`);
                })
        }
        else {
            logger.log("user not authorised for ending experiment");
            res.send("you don't have permission to end experiment")
        }
    },
    async experimentsByAccount(req, res) {
        let status = getToken(req);
        if(status) {
            await axios.get(`https://growth.render.com/experiment/${req.params.account}`)
                .then(response => {
                    logger.log("getting experiments by account from Growth");
                    res.send(response.data);
                })
                .catch(mock => {
                    logger.log("getting experiments by account from mock data");
                    const data = experimentRepository.getExperimentByAccount(req.params.account);
                    res.send(data);
                })
        }
        else {
            logger.log("user not authorised to get experiments by account");
            res.send("you don't have permissions");
        }
    },
    async ABTestExperimentsByAccount(req, res) {
        let status = getToken(req);
        if(status) {
            await axios.get(`https://growth.render.com/experiment/AB/${req.params.account}`)
                .then(response => {
                    logger.log("getting AB experiments by account from Growth");
                    res.send(response.data);
                })
                .catch(mock => {
                    logger.log("getting AB experiments by account from mock data");
                    const data = experimentRepository.getABTestByAccount(req.params.account);
                    res.send(data);
                })
        }
        else {
            logger.log("user not authorised to get experiments by account");
            res.send("you don't have permissions");
        }
    },
    async FeatureFlagExperimentsByAccount(req, res) {
        let status = getToken(req);
        if(status) {
            await axios.get(`https://growth.render.com/experiment/FF/${req.params.account}`)
                .then(response => {
                    logger.log("getting FF experiments by account from Growth");
                    res.send(response.data);
                })
                .catch(mock => {
                    logger.log("getting FF experiments by account from mock data");
                    const data = experimentRepository.getFeatureFlagByAccount(req.params.account);
                    res.send(data);
                })
        }
        else {
            logger.log("user not authorised to get experiments by account");
            res.send("you don't have permissions");
        }
    },
    async deleteExperiment(req, res) {
        const details = await getDetails(req);
        if (checkManagerAuth(details)) {
            await axios.delete(`https://growth.render.com/experiment/${req.params.id}`)
                .then(response => {
                    logger.log("deleting experiment using Growth");
                    res.send(response.data);
                })
                .catch(mock => {
                    logger.log("deleting experiment using mock data");
                    experimentRepository.deleteExperiment(req.params.id);
                    res.send(`experiment ${req.params.id} deleted`);
                })
        }
    },
    async callExperiment(req, res) {
        await axios.post(`https://growth.render.com/experiment/${req.params.id}`, req)
            .then(response => {
                logger.log("calling experiment using Growth");
                res.send(response.data);
            })
            .catch(mock => {
                logger.log("calling experiment using mock data");
                const experiment = experimentRepository.getExperimentById(req.params.id);
                if(experiment.type == "a-b") {
                    Math.random() < 0.5 ? res.send(experiment.variants.A) : res.send(experiment.variants.B);
                } else {
                    res.send("feature-flag")
                }

            })
    },
    async declareGoal(req, res) {
        await axios.post(`https://growth.render.com/experiment/goal/${req.params.id}`, req)
            .then(response => {
                logger.log("declaring goal using Growth");
                res.send("declared goal");
            })
            .catch(mock => {
                logger.log("declaring goal using mock data");
                res.send("declared goal");
            })
    },
    getExperimentById(req, res) {
        const experiment = experimentRepository.getExperimentById(req.params.id);
        res.json(experiment);
    }
}

