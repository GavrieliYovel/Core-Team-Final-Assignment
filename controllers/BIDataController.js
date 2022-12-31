const axios = require('axios');



exports.BIDataController = {
    MRR(req, res) {
        axios.get(`https://Billing.render.com/MRR/${req.params.month}`)
            .then(response=>{
                res.send(response.data)
            })
            .catch(mock=>{
                res.send(`MRR for the month of ${req.params.month}`)
            })
    },

    ARR(req, res) {
        axios.get(`https://Billing.render.com/ARR/${req.params.year}`)
            .then(response=>{
                res.send(response.data)
            })
            .catch(mock=>{
                res.send(`ARR for the year of ${req.params.year}`)
            })
    },

    payments(req, res) {
        axios.get(`https://Billing.render.com/payments/${req.params.month}`)
            .then(response=>{
                res.send(response.data)
            })
            .catch(mock=>{
                res.send(`Payments that succeeded/ failed we hat this month ${req.params.month}`)
            })

    };
