const axios = require("axios");
const {response} = require("express");

exports.IAMController = {
    login(req, res) {
        axios.post("https://iam-shenkar.onrender.com/auth/login", {
            "email": req.body.email,
            "password": req.body.password
        })
            .then(response => {
                res.send("success")
            })
            .catch(mock => {
                res.send("fail")
            })
    },
    getDetails(req,res) {
        axios.get("https://iam-shenkar.onrender.com/assets/features")
            .then(response => {
                    res.send(response.data)
            })
            .catch(mock => {
                    res.send("fail")
            })
    }
}
