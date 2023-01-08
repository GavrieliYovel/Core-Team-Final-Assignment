const axios = require('axios');
const ExperimentRepository = require('../repositories/experimentRepository');
const experimentRepository = new ExperimentRepository();


exports.BIDataController = {

    async getARR(req, res) {
        await axios.get(`https://billing-final-phase1-development.onrender.com/statistics/ARR/${req.params.year}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`300000`)
            })
    },
    async getMRR(req, res) {
        await axios.get(`https://billing-final-phase1-development.onrender.com/MRR/${req.params.year}/${req.params.month}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`25000`)
            })
    },
    async getDRR(req, res) {
        await axios.get(`https://billing-final-phase1-development.onrender.com/MRR/${req.params.year}/${req.params.month}/${req.params.day}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`25000`)
            })
    },

    async getPaymentsByMonth(req, res) {
        await axios.get(`https://billing-final-phase1-development.onrender.com/payments/${req.params.year}/${req.params.month}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send({
                    success: 10,
                    fail: 5
                })
            })

    },

    async getMonthlyExperiments(req, res) {
        await axios.get(`https://Growth.render.com/experiments?month=${req.params.month}&year=${req.params.year}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`${experimentRepository.getExperimentsByMonth(req.params.month, req.params.year)}`);
            })

    }

}
