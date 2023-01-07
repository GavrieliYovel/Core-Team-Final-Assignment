const axios = require("axios");
const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();

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
                const answer =  userRepository.login(req.body.email, req.body.password);
                if(answer == "success") {
                    req.session.userId = userRepository.getUserIdByEmail(req.body.email).id;
                    res.send({
                        mode: "mock",
                        response: "success"
                    });
                } else {
                    res.send("fail");
                }

            })
    },
    getDetails(req,res) {
        console.log(req.cookies.jwt);
        axios.get("https://iam-shenkar.onrender.com/assets", {
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
    setCredit(req, res) {
        axios.put(`https://iam-shenkar.onrender.com/assets/credits/${req.params.credit}`,{}, {
            headers: {
                'cookie': `jwt=${req.cookies.jwt}`,
                'Content-Type' : 'application/json'
            }
        })
            .then(response => {
                res.send(response.data)
            })
            .catch(mock => {
                console.log(mock.data)
                res.send("fail")
            })
    },
    setSeat(req,res) {
        axios.put(`https://iam-shenkar.onrender.com/assets/seats/${req.params.seat}`, {},{
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
