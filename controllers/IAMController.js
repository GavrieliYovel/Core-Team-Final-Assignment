const axios = require("axios");
const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();

exports.IAMController = {
    async login(req, res) {
        await axios.post("https://am-shenkar.onrender.com/auth/login", {
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
                if(answer === "success") {
                    const user = userRepository.getUserIdByEmail(req.body.email);
                    req.session.userId = user.id;
                    req.session.type = user.type;
                    res.send({
                        mode: "mock",
                        response: "success",
                        account: req.session.userId
                    });
                } else {
                    res.send("fail");
                }
            });
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
