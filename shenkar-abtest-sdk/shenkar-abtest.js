const axios = require("axios");
const requestIp = require('request-ip');
const geoip = require("geoip-lite");
const parser = require("ua-parser-js");
const {response} = require("express");
const {readUsedSize} = require("chart.js/helpers");


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

const filterUserAttributes = (endUserReq, endUserCustomAttributes = null) => {
    return {
        testAttributes: {
            location: getLocationCode(endUserReq),
            ...getUserBrowserDevice(endUserReq)
        },
        customAttributes: endUserCustomAttributes,
        uuid: endUserReq.cookies.uuid || null
    }
}


class ABTestSDK {

    async getVariant(experimentId, req, res) {
        const attributes = filterUserAttributes(req);
        let variant = "";
        if(attributes.uuid) { //old user
            axios.post("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/", {
                experimentId: experimentId,
                subscription: "pro",
                inclusive: true,
                ...attributes
            })
                .then(response => {
                    variant = response.data.variant;
                })
                .catch(fail => {
                    variant = "wrong";
                })
        } else { //new User
            axios.post("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/", {
                experimentId: experimentId,
                subscription: "pro",
                inclusive: true,
                ...attributes
            })
                .then(response => {
                    variant = response.data.variant;
                    const newUuid = response.data.uuid;
                    res.cookie("uuid", newUuid, { maxAge: 900000, httpOnly: true });
                })
                .catch(fail => {
                    variant = "wrong";
                })
        }
        return variant;

    }

    async reportGoal(experimentId, goalId, req) {
        const attributes = filterUserAttributes(req);
        let successCount;
        axios.post("http://localhost:3030/Growth/experiment/goal/", {
            experimentId: experimentId,
            goalId: goalId,
            ...attributes
        })
            .then(response => {
                successCount = response.data;
            })
            .catch(fail => {
                successCount = "wrong ";
            })
        return successCount;
    }

}

module.exports = ABTestSDK;
