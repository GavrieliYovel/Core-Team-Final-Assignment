const axios = require("axios");


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
                res.cookie(response.headers["set-cookie"]);
                res.send("success");
            })
            .catch(mock => {
                res.send("fail")
            })
    },
    getDetails(req,res) {
        console.log(req.cookies.jwt);
        axios.get("https://iam-shenkar.onrender.com/assets/features", {
            headers: {
                'cookie': `jwt=${req.cookies.jwt}`,
                'Content-Type' : 'application/json'
            }
        })
            .then(response => {
                    res.send(response.data)
            })
            .catch(mock => {
                    res.send("fail")
            })
    },
    getToken(req,res) {
        axios.get("https://iam-shenkar.onrender.com/assets/token", {
            headers: {
                'cookie': `jwt=${req.cookies.jwt}`,
                'Content-Type' : 'application/json'
            }
        })
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send("fail")
            })
    },
    getCredit(req,res) {
        axios.get("https://iam-shenkar.onrender.com/assets/credits", {
            headers: {
                'cookie': `jwt=${req.cookies.jwt}`,
                'Content-Type' : 'application/json'
            }
        })
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send("fail")
            })
    },
    setCredit(req,res) {
        axios.put(`https://iam-shenkar.onrender.com/assets/credits/1`,{}, {
            headers: {
                'cookie': `jwt=${req.cookies.jwt}`,
                'Content-Type' : 'application/json'
            }
        })
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                console.log(mock)
                res.send("fail")
            })
    },
    setSeat(req,res) {
        axios.put(`https://iam-shenkar.onrender.com/assets/seats/1`, {},{
            headers: {
                'cookie': `jwt=${req.cookies.jwt}`,
                'Content-Type' : 'application/json'
            }
        })
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                res.send("fail")
            })
    }


}
