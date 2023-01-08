const axios = require('axios');
const ExperimentRepository = require('../repositories/experimentRepository');
const experimentRepository = new ExperimentRepository();
const Logger = require("../logger/Logger");
const logger = new Logger();

exports.BIDataController = {

    async getARR(req, res) {
        await axios.get(`https://billing-final-phase1-development.onrender.com/statistics/ARR/${req.params.year}`)
            .then(response => {
                logger.log("getting ARR from Billing");
                res.json(response.data)
            })
            .catch(mock => {
                logger.log("getting ARR from mock data");
                res.send(`300000`)
            })
    },
    async getMRR(req, res) {
        await axios.get(`https://billing-final-phase1-development.onrender.com/MRR/${req.params.year}/${req.params.month}`)
            .then(response => {
                logger.log("getting MRR from Billing");
                res.json(response.data)
            })
            .catch(mock => {
                logger.log("getting MRR from mock data");
                res.send(`25000`)
            })
    },
    async getDRR(req, res) {
        await axios.get(`https://billing-final-phase1-development.onrender.com/MRR/${req.params.year}/${req.params.month}/${req.params.day}`)
            .then(response => {
                logger.log("getting DRR from Billing");
                res.json(response.data)
            })
            .catch(mock => {
                logger.log("getting DRR from mock data");
                res.send(`25000`)
            })
    },

    async getPaymentsByMonth(req, res) {
        await axios.get(`https://billing-final-phase1-development.onrender.com/payments/${req.params.year}/${req.params.month}`)
            .then(response => {
                logger.log("getting Payments By Month from Billing");
                res.json(response.data)
            })
            .catch(mock => {
                logger.log("getting Payments By Month from mock data");
                res.send({
                    success: 10,
                    fail: 5
                })
            })

    },

    async getMonthlyExperiments(req, res) {
        await axios.get(`https://Growth.render.com/experiments?month=${req.params.month}&year=${req.params.year}`)
            .then(response => {
                logger.log("getting Monthly Experiments from Growth");
                res.json(response.data)
            })
            .catch(mock => {
                logger.log("getting Monthly Experiments from mock data");
                res.send(`${experimentRepository.getExperimentsByMonth(req.params.month, req.params.year)}`);
            })

    }

}
