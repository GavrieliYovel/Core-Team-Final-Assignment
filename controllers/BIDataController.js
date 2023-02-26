const axios = require('axios');
const Logger = require("abtest-logger");
const logger = new Logger("amqps://qdniwzza:a-yzSrHM7aPJ-ySEYMc7trjzvs00QJ5b@rattlesnake.rmq.cloudamqp.com/qdniwzza");

exports.BIDataController = {

    async getARR(req, res) {
        await axios.get(`https://billing-final-phase1-development.onrender.com/statistics/arr/${req.params.year}`)
            .then(response => {
                logger.info("getting ARR from Billing");
                res.status(200);
                res.json(response.data)
            })
            .catch(error => {
                logger.error("Failed to get ARR from Billing");
                res.status(404);
                res.json({message: "Failed to get ARR from Billing"});
            })
    },
    async getMRR(req, res) {
        await axios.get(`https://billing-final-phase1-development.onrender.com/statistics/mrr/${req.params.year}/${req.params.month}`)
            .then(response => {
                logger.info("getting MRR from Billing");
                res.status(200);
                res.json(response.data)
            })
            .catch(mock => {
                logger.error("Failed to get MRR from Billing");
                res.status(404);
                res.json({message: "Failed to get MRR from Billing"});
            })
    },
    async getDRR(req, res) {
        await axios.get(`https://billing-final-phase1-development.onrender.com/statistics/drr/${req.params.year}/${req.params.month}/${req.params.day}`)
            .then(response => {
                logger.info("getting DRR from Billing");
                res.status(200);
                res.json(response.data)
            })
            .catch(mock => {
                logger.error("Failed to get DRR from Billing");
                res.status(404);
                res.json({message: "Failed to get DRR from Billing"});
            })
    },

    async getPaymentsByMonth(req, res) {
        await axios.get(`https://billing-final-phase1-development.onrender.com/statistics/payment-intents/${req.params.year}/${req.params.month}`)
            .then(response => {
                logger.info("getting Payments By Month from Billing");
                res.send(response.data)
            })
            .catch(mock => {
                logger.error("Failed to get Monthly Payments from Billing");
                res.status(404);
                res.json({message: "Failed to get Monthly Payments from Billing"});
            })

    },

    async getMonthlyExperiments(req, res) {
        await axios.get(`https://Growth.render.com/experiments?month=${req.params.month}&year=${req.params.year}`)
            .then(response => {
                logger.info("getting Monthly Experiments from Growth");
                res.status(200);
                res.json(response.data)
            })
            .catch(mock => {
                logger.error("Failed to get Monthly Experiments from Growth");
                res.status(404);
                res.json({message: "Failed to get Monthly Experiments from Growth"});
            })

    }

}
