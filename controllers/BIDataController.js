const axios = require('axios');
const ExperimentRepository = require('../repositories/experimentRepository');
const experimentRepository = new ExperimentRepository();


exports.BIDataController = {
    getMRR(req, res) {
        axios.get(`https://Billing.render.com/MRR/${req.params.month}/${req.params.year}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`Monthly Recurring Revenue ${req.params.month} month in ${req.params.year}`)
            })
    },

    getARR(req, res) {
        axios.get(`https://Billing.render.com/ARR/${req.params.year}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`Annual Recurring Revenue for ${req.params.year}`)
            })
    },

    getPaymentsByMonth(req, res) {
        axios.get(`https://Billing.render.com/payments/${req.params.month}/${req.params.year}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`Payments that succeeded in ${req.params.month} month in ${req.params.year}`)
            })

    },

    getMonthlyExperiments(req, res) {
        axios.get(`https://Growth.render.com/experiments?month=${req.params.month}&year=${req.params.year}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`${experimentRepository.getExperimentsByMonth(req.params.month, req.params.year)}`);
            })

    },
    //
    // getDistributionByDevice(req, res) {
    //     axios.get(`https://Growth.render.com/distribution/${req.params.device}`)
    //         .then(response => {
    //             res.send(response.data)
    //         })
    //         .catch(mock => {
    //             res.send(`distribution by device ${req.params.device}`)
    //         })
    //
    // },
    //
    // getDistributionByGeo(req, res) {
    //     axios.get(`https://Growth.render.com/distribution/${req.params.location}`)
    //         .then(response => {
    //             res.send(response.data)
    //         })
    //         .catch(mock => {
    //             res.send(`distribution by geo ${req.params.location}`)
    //         })
    //
    // }

}
