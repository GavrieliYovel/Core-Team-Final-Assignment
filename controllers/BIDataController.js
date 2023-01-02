const axios = require('axios');



exports.BIDataController = {
    getMRR(req, res) {
        axios.get(`https://Billing.render.com/MRR/${req.params.month}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`MRR for the month of ${req.params.month}`)
            })
    },

    getARR(req, res) {
        axios.get(`https://Billing.render.com/ARR/${req.params.year}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`ARR for the year of ${req.params.year}`)
            })
    },

    getTypeOfPayments(req, res) {
        axios.get(`https://Billing.render.com/payments/${req.params.month}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`Payments that succeeded/ failed we had this month ${req.params.month}`)
            })

    },



    getMonthlyExperiments(req, res) {
        axios.get(`https://Growth.render.com/experiments/${req.params.month}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`experiments running per month ${req.params.month}`)
            })

    },


    getDistributionByDevice(req, res) {
        axios.get(`https://Growth.render.com/distribution/${req.params.device}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`distribution by device ${req.params.device}`)
            })

    },
    getDistributionByGeo(req, res) {
        axios.get(`https://Growth.render.com/distribution/${req.params.geo}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send(`distribution by geo ${req.params.geo}`)
            })

    }

}
