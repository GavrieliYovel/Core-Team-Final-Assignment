const axios = require("axios");
const requestIp = require('request-ip');
const geoip = require("geoip-lite");
const parser = require("ua-parser-js");


const getIp = (endUserReq) => {
    return requestIp.getClientIp(endUserReq)
}

const getLocationCode = (endUserReq) => {
    return geoip.lookup(getIp(endUserReq));
}

const getUserBrowserDevice = (endUserReq) => {
    const userAgentInfo = parser(endUserReq.headers["user-agent"]);
    return {
        browser: userAgentInfo.browser.name,
        device: userAgentInfo.device.type || "desktop",
    };
}


class ABTestSDK {
    account_id;
     constructor(email, password){
         axios.post("https://core-team-final-assignment-dev.onrender.com/IAM/login", {
             "email": email,
             "password": password
         })
             .then(response => {
                 this.setAccountID(response.data.account)
             })
             .catch(response =>{
                 console.log("Failed to login");
             })
     }

     setAccountID(id){
         this.account_id = id;
     }

     getAccountID(){
         return this.account_id;
     }

    async getVariant(experimentId, attributes){
        await axios.post("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/", {
            experimentId: experimentId,
            subscription: "pro",
            ...attributes
        })
            .then(response => {
                return response.data;
            })
            .catch(fail => {
                return "wrong ";
            })
    }
    async reportGoal(experimentId, goalId ,attributes){
        await axios.post("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/goal/", {
            experimentId: experimentId,
            goalId: goalId,
            ...attributes
        })
            .then(response => {
                return response.data;
            })
            .catch(fail => {
                return "wrong ";
            })
    }

    filterUserAttributes(endUserReq, endUserCustomAttributes = null) {
        return {
            testAttributes: {
                location: getLocationCode(endUserReq),
                ...getUserBrowserDevice(endUserReq)
            },
            customAttributes: endUserCustomAttributes,
            uuid:  endUserReq.cookies.uuid || null
        }
    }

}

module.exports = ABTestSDK;
