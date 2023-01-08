const axios = require("axios");
const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();
const Logger = require("../logger/Logger");
const logger = new Logger();

exports.IAMController = {
    async login(req, res) {
        await axios.post("https://am-shenkar.onrender.com/auth/login", {
            "email": req.body.email,
            "password": req.body.password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                logger.log("login from IAM succeeded");
                res.cookie(response.headers["set-cookie"]);
                res.send("success");
            })
            .catch(mock => {
                const answer = userRepository.login(req.body.email, req.body.password);
                if (answer === "success") {
                    logger.log("login from mock data succeeded");
                    const user = userRepository.getUserIdByEmail(req.body.email);
                    req.session.userId = user.id;
                    req.session.type = user.type;
                    res.send({
                        mode: "mock",
                        response: "success",
                        account: req.session.userId
                    });
                } else {
                    logger.log("login from mock data failed");
                    res.send("fail");
                }
            });
    },
    getSession(req, res) {
        res.json({
            userId: req.session.userId,
            type: req.session.type
        })
    }
    // getDetails(req, res) {
    //     console.log(req.cookies.jwt);
    //     axios.get("https://iam-shenkar.onrender.com/assets", {
    //         headers: {
    //             'cookie': `jwt=${req.cookies.jwt}`,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             logger.log("getting details from IAM");
    //             res.send(response.data)
    //         })
    //         .catch(mock => {
    //             logger.log("failed getting details from IAM");
    //             res.send("fail")
    //         })
    // },
    // getToken(req, res) {
    //     axios.get("https://iam-shenkar.onrender.com/assets/token", {
    //         headers: {
    //             'cookie': `jwt=${req.cookies.jwt}`,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             logger.log("getting token from IAM");
    //             res.send(response.data)
    //         })
    //         .catch(mock => {
    //             logger.log("failed getting token from IAM");
    //             res.send("fail")
    //         })
    // },
    // getCredits(req, res) {
    //     axios.get("https://iam-shenkar.onrender.com/assets/credits", {
    //         headers: {
    //             'cookie': `jwt=${req.cookies.jwt}`,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             logger.log("getting credits from IAM");
    //             res.send(response.data)
    //         })
    //         .catch(mock => {
    //             logger.log("failed getting credits from IAM");
    //             res.send("fail")
    //         })
    // },
    // setCredit(req, res) {
    //     axios.put(`https://iam-shenkar.onrender.com/assets/credits/${req.params.credit}`, {}, {
    //         headers: {
    //             'cookie': `jwt=${req.cookies.jwt}`,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             logger.log("setting credits using IAM");
    //             res.send(response.data)
    //         })
    //         .catch(mock => {
    //             logger.log("failed setting credits using IAM");
    //             console.log(mock.data)
    //             res.send("fail")
    //         })
    // },
    // getSeats(req, res){
    //     axios.get(`https://iam-shenkar.onrender.com/assets/seats/${req.params.seat}`, {}, {
    //         headers: {
    //             'cookie': `jwt=${req.cookies.jwt}`,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             logger.log("getting seats from IAM");
    //             res.send(response.data)
    //         })
    //         .catch(mock => {
    //             logger.log("failed getting seats from IAM");
    //             res.send("fail")
    //         })
    // },
    // setSeat(req, res) {
    //     axios.put(`https://iam-shenkar.onrender.com/assets/seats/${req.params.seat}`, {}, {
    //         headers: {
    //             'cookie': `jwt=${req.cookies.jwt}`,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(response => {
    //             logger.log("setting seats using IAM");
    //             res.send(response.data)
    //         })
    //         .catch(mock => {
    //             logger.log("failed setting seats using IAM");
    //             res.send("fail")
    //         })
    // }
}


