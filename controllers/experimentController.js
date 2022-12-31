const axios = require('axios');

exports.experimentController = {
    createExperiment(req, res) {
        let newExperiment = {
            type: req.body.type,
            hypotheses: req.body.hypotheses,
            attributes: req.body.attributes,
            conditions: req.body.conditions,
            goals: req.body.goals
        }
        axios.post('https://growth.render.com/experiment/new', newExperiment)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                res.send(newExperiment);
            })
    },
    updateExperiment(req, res) {
        let updatedExperiment = {
            experimentId: req.body.experimentId,
            params: req.body.params
        }
        axios.put('https://growth.render.com/experiment/update', updatedExperiment)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
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
    }
}

