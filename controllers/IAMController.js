const axios = require("axios");


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
                res.cookie(response.headers["set-cookie"]);
                res.send("success");
            })
            .catch(mock => {

            });
    },
    getSession(req, res) {
        res.status(200).json({
            userId: req.session.userId,
            type: req.session.type
        })
    }
}

