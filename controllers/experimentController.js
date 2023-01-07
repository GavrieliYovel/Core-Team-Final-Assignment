const axios = require('axios');
const ExperimentRepository = require('../repositories/experimentRepository');
const experimentRepository = new ExperimentRepository();
const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();

function checkManagerAuth(details) {
    if(details.type != "manager" || details.credits <= 0) {
        return false;
    } else {
        return true;
    }
}
//getting type, credits, plan assets from IAM
async function getDetails(id) {
    let details;
    console.log(id);
    //getting type, credits, plan assets from IAM
    await axios.get('https://iam-shenkar.onrender.com/assets', {headers: {'Content-Type': 'application/json'}})
        .then(response => {
            console.log(response.data);
            details = response.data;
        })
        .catch(mock => {
            console.log(id);
            details = userRepository.getDetailsById(id);
        })
    return details;
}
exports.experimentController = {
    async createExperiment(req, res) {
        console.log(req.session.userId);
        const details = await getDetails(req.session.userId);

        if (checkManagerAuth(details)) {
            await axios.post('https://growth.render.com/experiment/new', req.body)
                .then(async response => {
                    await axios.put('https://iam-shenkar.onrender.com/credits/1', {headers: {'Content-Type': 'application/json'}})
                        .then(response => {
                            res.send(response.data);
                        })
                        .catch(mock => {
                            userRepository.decreaseCredit(req.session.userId, 1);
                            const id = experimentRepository.createExperiment(req.body);
                            res.send(experimentRepository.getExperimentById(id));
                        })
                })
                .catch(mock => {
                    const id = experimentRepository.createExperiment(req.body);
                    res.send(experimentRepository.getExperimentById(id));
                })
        } else {
            res.send("you don't have permission to create experiment")
        }

    },
    async updateExperiment(req, res) {
        let details;
        //getting type, credits, plan assets from IAM
        await axios.get('https://iam-shenkar.onrender.com/assets', {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                details = response.data;
            })
            .catch(mock => {
                details = userRepository.getDetailsById(req.session.userId);
            })
        await axios.put(`https://growth.render.com/experiment/${req.params.id}`, req.body)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                const updatedExperiment = experimentRepository.updateExperiment(req.body, req.params.id);
                res.send(updatedExperiment);
            })
    },
    async experimentStatistics(req , res) {
        await axios.get(`https://growth.render.com/experiment/${req.params.id}/statistics`)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                res.send(`Statistics data from experiment ${req.params.id}`);
            })
    },
    async endExperiment(req, res) {
        await axios.post(`https://growth.render.com/experiment/${req.params.id}/statistics`, {
            experimentId: req.body.experimentId
        })
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                res.send(`experiment ${req.params.id} ended`);
            })
    },
    async experimentsByAccount(req, res) {
        await axios.get(`https://growth.render.com/experiment/${req.params.account}`)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                const data = experimentRepository.getExperimentByAccount(req.params.account);
                res.send(data);
            })
    },
    async ABTestByAccount(req, res) {
        await axios.get(`https://growth.render.com/experiment/AB/${req.params.account}`)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                const data = experimentRepository.getABTestByAccount(req.params.account);
                res.send(data);
            })
    },
    async FeatureFlagByAccount(req, res) {
        await axios.get(`https://growth.render.com/experiment/FF/${req.params.account}`)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                const data = experimentRepository.getFeatureFlagByAccount(req.params.account);
                res.send(data);
            })
    },
    async deleteExperiment(req, res) {
        await axios.delete(`https://growth.render.com/experiment/${req.params.id}`)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                experimentRepository.deleteExperiment(req.params.id);
                res.send(`experiment ${req.params.id} deleted`);
            })
    },
    async callExperiment(req, res) {
        await axios.post(`https://growth.render.com/experiment/${req.params.id}`, req)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
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
                res.send("declared goal");
            })
            .catch(mock => {
                res.send("declared goal");
            })
    }
}

