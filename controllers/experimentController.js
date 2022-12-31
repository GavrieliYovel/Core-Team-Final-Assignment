const axios = require('axios');
const {response} = require("express");

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
    }
}

