const Logger = require("abtest-logger");
const logger = new Logger("amqps://qdniwzza:a-yzSrHM7aPJ-ySEYMc7trjzvs00QJ5b@rattlesnake.rmq.cloudamqp.com/qdniwzza");
const {Log} = require("../models/logger")


exports.loggerController = {
    async getAllLogs(req, res) {
        const logs = await Log.find({});
        res.send(logs);
    }
}


