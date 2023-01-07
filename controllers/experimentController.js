const axios = require('axios');
const ExperimentRepository = require('../repositories/experimentRepository');
const experimentRepository = new ExperimentRepository();

exports.experimentController = {
    createExperiment(req, res) {
        // axios.get('https://iam-shenkar.onrender.com/assets/token')
        //     .then(response => {
        //         const user = response.data;
        //         if (user.type !== 'manager')
        //             res.send("Not Authorised"); // should change to page
        //     })
        //     .catch(mock => {
        //         const user = IAMRepository.getUserById(id);
        //         res.send(experimentRepository.getExperimentById(id));
        //     })

        axios.post('https://growth.render.com/experiment/new', req.body)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                const id = experimentRepository.createExperiment(req.body);
                res.send(experimentRepository.getExperimentById(id));
            })
    },
    updateExperiment(req, res) {
        axios.put(`https://growth.render.com/experiment/${req.params.id}`, req.body)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                const updatedExperiment = experimentRepository.updateExperiment(req.body, req.params.id);
                res.send(updatedExperiment);
            })
    },
    experimentStatistics(req , res) {
        axios.get(`https://growth.render.com/experiment/${req.params.id}/statistics`)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                res.send(`Statistics data from experiment ${req.params.id}`);
            })
    },
    endExperiment(req, res) {
        axios.post(`https://growth.render.com/experiment/${req.params.id}/statistics`, {
            experimentId: req.body.experimentId
        })
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                res.send(`experiment ${req.params.id} ended`);
            })
    },
    experimentsByAccount(req, res) {
        axios.get(`https://growth.render.com/experiment/${req.params.account}`)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                const data = experimentRepository.getExperimentByAccount(req.params.account);
                res.send(data);
            })
    },
    ABTestByAccount(req, res) {
        axios.get(`https://growth.render.com/experiment/AB/${req.params.account}`)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                const data = experimentRepository.getABTestByAccount(req.params.account);
                res.send(data);
            })
    },
    FeatureFlagByAccount(req, res) {
        axios.get(`https://growth.render.com/experiment/FF/${req.params.account}`)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                const data = experimentRepository.getFeatureFlagByAccount(req.params.account);
                res.send(data);
            })
    },
    deleteExperiment(req, res) {
        axios.delete(`https://growth.render.com/experiment/${req.params.id}`)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                experimentRepository.deleteExperiment(req.params.id);
                res.send(`experiment ${req.params.id} deleted`);
            })
    },
    callExperiment(req, res) {
        axios.post(`https://growth.render.com/experiment/${req.params.id}`, req)
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
    declareGoal(req, res) {
        axios.post(`https://growth.render.com/experiment/goal/${req.params.id}`, req)
            .then(response => {
                res.send("declared goal");
            })
            .catch(mock => {
                res.send("declared goal");
            })
    }
}

