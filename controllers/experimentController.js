const axios = require('axios');
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
            details = 1;
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
            logger.error("failed getting token from mock data");
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
                            res.status(200);
                            res.json(response.data);
                        })
                        .catch(mock => {
                            logger.error("Failed to use 1 credit from IAM API");
                            res.status(404);
                            res.json({message: "Failed to use 1 credit from IAM API"});
                        })
                })
                .catch(mock => {
                    logger.error("Failed to create experiment from Growth API");
                    res.status(404);
                    res.json({message: "Failed to create experiment from Growth API"});
                })
        }
        else {
            logger.info("user not authorised for creating experiment");
            res.status(500);
            res.json({message: "you don't have permission to create experiment"});
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
                    res.status(200);
                    res.json(response.data);
                })
                .catch(mock => {
                    logger.error("Failed to update Experiments from Growth API");
                    res.status(404);
                    res.json({message: "Failed to update Experiments from Growth API"});
                })
        }
        else {
            logger.info("user not authorised for creating experiment");
            res.status(500);
            res.json({message: "you don't have permission to create experiment"});
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
                    res.status(200);
                    res.json(response.data);
                })
                .catch(error => {
                    logger.error("Failed to terminate experiment from Growth API");
                    res.status(404);
                    res.json({message: "Failed to terminate experiment from Growth API"});
                })
        }
        else {
            logger.info("user not authorised for creating experiment");
            res.status(500);
            res.json({message: "you don't have permission to create experiment"});
        }
    },
    async experimentsByAccount(req, res) {
        let status = getToken(req);
        if(status) {
            await axios.get(`${growthRender}experiments/account/${req.params.account}`)
                .then(response => {
                    logger.info("getting experiments by account from Growth");
                    res.status(200);
                    res.json(response.data);
                })
                .catch(mock => {
                    logger.error("Failed to get Experiments by account from Growth API");
                    res.status(404);
                    res.json({message: "Failed to get Experiments by account from Growth API"});
                })
        }
        else {
            logger.info("user not authorised for creating experiment");
            res.status(500);
            res.json({message: "you don't have permission to create experiment"});
        }
    },
    async ABTestExperimentsByAccount(req, res) {
        let status = getToken(req);
        if(status) {
            await axios.get(`${growthRender}experiments/AB/${req.params.account}`)
                .then(response => {
                    logger.info("getting AB experiments by account from Growth");
                    res.status(200);
                    res.json(response.data);
                })
                .catch(mock => {
                    logger.error("Failed to get AB Test Experiments by account from Growth API");
                    res.status(404);
                    res.json({message: "Failed to get AB Test Experiments by account from Growth API"});
                })
        }
        else {
            logger.info("user not authorised for creating experiment");
            res.status(500);
            res.json({message: "you don't have permission to create experiment"});
        }
    },
    async FeatureFlagExperimentsByAccount(req, res) {
        let status = getToken(req);
        if(status) {
            await axios.get(`${growthRender}experiments/FF/${req.params.account}`)
                .then(response => {
                    logger.info("getting FF experiments by account from Growth");
                    res.status(200);
                    res.json(response.data);
                })
                .catch(mock => {
                    logger.error("Failed to get Feature Flag Experiments by account from Growth API");
                    res.status(200);
                    res.json({message: "Failed to get Feature Flag Experiments by account from Growth API"});
                })
        }
        else {
            logger.info("user not authorised for creating experiment");
            res.status(500);
            res.json({message: "you don't have permission to create experiment"});
        }
    },
    async getVariant(req, res) {
        await axios.post(`${growthRender}test/run`, req.body, req.headers)
            .then(response => {
                logger.info("calling experiment using Growth");
                res.status(200);
                res.json(response.data);
            })
            .catch(mock => {
                logger.error("Failed to get call Experiments from Growth API");
                res.status(404);
                res.json({message: "Failed to get call Experiments from Growth API"});
            })
    },
    async reportGoal(req, res) {
        await axios.put(`${growthRender}report-goal`, req.body)
            .then(response => {
                logger.info("declaring goal using Growth");
                res.status(200);
                res.json(response.data);
            })
            .catch(mock => {
                logger.error("Failed to declareGoal from Growth API");
                res.status(404);
                res.json({message: "Failed to declareGoal from Growth API"});
            })

    },
    async getExperimentById(req, res) {
        await axios.get(`${growthRender}experiments/${req.params.id}`)
            .then(response => {
                logger.info("get experiment by Id using Growth");
                res.status(200);
                res.json(response.data);
            })
            .catch(mock => {
                logger.error("Failed to get experiment by ID from Growth API");
                res.status(404);
                res.json({message: "Failed to get experiment by ID from Growth API"});
            })
    },
    async getVariantExposeById(req, res) {
        await axios.get(`${growthRender}stats/userVariant/${req.params.id}`)
            .then(response => {
                logger.info("get experiment variant count using Growth");
                res.status(200);
                res.json(response.data);
            })
            .catch(error => {
                logger.error("Failed to getVariantExposeById from Growth API");
                res.status(404);
                res.json({message: "Failed to getVariantExposeById from Growth API"});
            })
    },
    async getVariantSuccessById(req, res) {
        await axios.get(`${growthRender}stats/variantSuccessCount/${req.params.id}/${req.params.gid}`)
            .then(response => {
                logger.info("get variant success count by ID using Growth");
                res.status(200);
                res.json(response.data);
            })
            .catch(error => {
                logger.error("Failed to getVariantSuccessById from Growth API");
                res.status(404);
                res.json({message: "Failed to getVariantSuccessById from Growth API"});
            })
    },
    async getRequestPerAttributeById(req, res) {
        await axios.get(`${growthRender}stats/reqPerAtt/${req.params.id}`)
            .then(response => {
                logger.info("get Request per attribute by ID using Growth");
                res.status(404);
                res.json(response.data);
            })
            .catch(error => {
                logger.error("Failed to get Request per attribute from Growth API");
                res.status(404);
                res.json({message: "Failed to get Request per attribute from Growth API"});
            })
    },
    async experimentCallsByAccount(req, res) {
        await axios.get(`${growthRender}stats/testsPerMonth/${req.params.account}`)
            .then(response => {
                logger.info("get experiment calls per month by ID using Growth API");
                const sumCalls = response.data.tests.reduce((total, current) => {
                    return total + current.totalCalls;
                }, 0);
                res.status(200);
                res.json({calls: sumCalls});
            })
            .catch(error => {
                logger.error("Failed get experiment calls per month by ID using Growth API");
                res.status(404);
                res.json({message: "Failed get experiment calls per month by ID using Growth API"});
            })
    }
}
