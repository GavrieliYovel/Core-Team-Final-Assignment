const axios = require('axios');
const ExperimentRepository = require('../repositories/experimentRepository');
const experimentRepository = new ExperimentRepository();

exports.experimentController = {
    createExperiment(req, res) {
        let newExperiment = {
            name: req.body.name,
            account: req.body.account,
            type: req.body.type,
            test_attributes: req.body.test_attributes,
            variant_success_count: req.body.variant_success_count,
            traffic_percentage: req.body.traffic_percentage,
            call_count: req.body.call_count,
            status: req.body.status,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            variants: req.body.variants
        }

        axios.post('https://growth.render.com/experiment/new', newExperiment)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                const id = experimentRepository.createExperiment(newExperiment);
                res.send(experimentRepository.getExperimentById(id));
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
    deleteExperiment(req, res) {
        axios.delete(`https://growth.render.com/experiment/${req.params.id}`)
            .then(response => {
                res.send(response.data);
            })
            .catch(mock => {
                experimentRepository.deleteExperiment(req.params.id);
                res.send(`experiment ${req.params.id} deleted`);
            })
    }
}

