const axios = require("axios");
const {response} = require("express");

exports.IAMController = {
    login(req, res) {
        axios.post("https://iam-shenkar.onrender.com/auth/login", {
            "email": req.body.email,
            "password": req.body.password
        }, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then(response => {
                console.log(response.data);
                console.log(response.headers);
                console.log(response.set);
                console.log(req.cookies);
                res.cookie(response.headers["set-cookie"]);
                res.send("success");
            })
            .catch(mock => {
                res.send("fail")
            })
    },
    getDetails(req,res) {
        axios.get("https://iam-shenkar.onrender.com/assets/features"), {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
            .then(response => {
                    res.send(response.data)
            })
            .catch(mock => {
                    res.send("fail")
            })
    }
}
