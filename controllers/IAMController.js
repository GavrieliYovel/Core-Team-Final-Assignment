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
                    res.status(200).json({
                        mode: "mock",
                        account: req.session.userId
                    });
                } else {
                    logger.log("login from mock data failed");
                    res.send("fail");
                }
            });
    },
    getSession(req, res) {
        res.status(200).json({
            userId: req.session.userId,
            type: req.session.type
        })
    }
}


