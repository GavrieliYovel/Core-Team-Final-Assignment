const axios = require('axios');
const Logger = require("abtest-logger");
const logger = new Logger("amqps://qdniwzza:a-yzSrHM7aPJ-ySEYMc7trjzvs00QJ5b@rattlesnake.rmq.cloudamqp.com/qdniwzza");

const growthRender = "https://ab-test-bvtg.onrender.com/";


async function getDetails(req) {
    console.log("token details: " + req.headers.authorization);
    let details;
    //getting type, credits, plan assets from IAM
    await axios.get('https://abtest-shenkar.onrender.com/assets', {
        headers: {
            'authorization': `${req.headers.authorization}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            logger.info("getting user details from IAM");
            details = response.data;
        })
        .catch(mock => {+
            console.log(mock.message)
            logger.error("Failed to get details  from IAM JWT");
        })
    console.log("details: " + details);
    return details;
}


async function getToken(req) {
    console.log("token: " + req.headers.authorization);
    axios.get('https://abtest-shenkar.onrender.com/assets/token', {
        headers: {
            'authorization': `${req.headers.authorization}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log("token check success");
        })
        .catch(error => {
            console.error(error);
        });
}


exports.experimentController = {
    async createExperiment(req, res) {
        await getToken(req);
        //  details = await getDetails(req);
        const details = {type: 'manager'};
        if (details.type === 'manager') {
            axios.post(`${growthRender}experiments/new`, req.body)
                .then(async response => {
                    logger.info("creating experiment using Growth API");
                    res.status(200);
                    res.json(response.data);
                })
                .catch(mock => {
                    logger.error("Failed to create experiment from Growth API");
                    res.status(404);
                    res.json({message: "Failed to create experiment from Growth API"});
                })
        } else {
            logger.info("user not authorised for create experiment");
            res.status(500);
            res.json({message: "you don't have permission to create experiment"});
        }

    },
    async updateExperiment(req, res) {
        await getToken(req);
        const details = await getDetails(req);
        if (details.type === 'manager') {
            axios.put(`${growthRender}experiments/${req.params.id}`, req.body)
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
        } else {
            logger.info("user not authorised for update experiment");
            res.status(500);
            res.json({message: "you don't have permission to update experiment"});
        }
    },
    async terminateExperiment(req, res) {
        await getToken(req);
        const details = await getDetails(req);
        if (details.type === 'manager') {
             axios.put(`${growthRender}experiments/terminate/${req.params.id}`, {})
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
        } else {
            logger.info("user not authorised for terminate experiment");
            res.status(500);
            res.json({message: "you don't have permission to terminate experiment"});
        }
    },
    async experimentsByAccount(req, res) {
        await getToken(req);
        const details = await getDetails(req);
        axios.get(`${growthRender}experiments/account/${details?.accountId}`)
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
    },
    async ABTestExperimentsByAccount(req, res) {
        await getToken(req);
        const details = await getDetails(req);
        axios.get(`${growthRender}experiments/AB/${details?.accountId}`)
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
    },
    async FeatureFlagExperimentsByAccount(req, res) {
        await getToken(req);
        const details = await getDetails(req);
         axios.get(`${growthRender}experiments/FF/${details?.accountId}`)
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
    },
    async getVariant(req, res) {
         axios.post(`${growthRender}test/run`, req.body, req.headers)
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
         axios.put(`${growthRender}test/report-goal`, req.body)
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
        await getToken(req);
        const details = await getDetails(req);

         axios.get(`${growthRender}experiments/${req.params.id}`)
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
        await getToken(req);
        const details = await getDetails(req);

         axios.get(`${growthRender}stats/userVariant/${req.params.id}`)
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
        await getToken(req);
        const details = await getDetails(req);

         axios.get(`${growthRender}stats/variantSuccessCount/${req.params.id}/${req.params.gid}`)
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
        await getToken(req);
        const details = await getDetails(req);

         axios.get(`${growthRender}stats/reqPerAtt/${req.params.id}`)
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
        await getToken(req);
        const details = await getDetails(req);

        axios.get(`${growthRender}stats/testsPerMonth/${details?.accountId}`)
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
    },
    async getAccountDetails(req, res) {
        await getToken(req);
        const details = await getDetails(req);
        res.status(200);
        res.json(details);
    }
}
