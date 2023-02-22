const moment = require('moment');
const {Logs} = require('./logger')
const mongoose = require('mongoose');

module.exports = class Logger{
    constructor(path) {
        if (!Logger._instance) {
            this.#connectToMongo(path);
            this.logger = console;
            Logger._instance = this;
        } else {
            return Logger._instance;
        }
    }
    #connectToMongo(path) {
        const options = {
            useNewUrlParser: true,    // For deprecation warnings
            useUnifiedTopology: true // For deprecation warnings
        };
        mongoose.set('strictQuery', false);
        mongoose
            .connect(path, options)
            .then(() => console.log('logger successfully connected to mongoDB'))
            .catch(err => console.log(`logger connection error: ${err}`));
    }


    async info(message = '') {
        const time = moment().format('DD-MM-YY hh:mm:ss');
        const newLog = new Logs({
            level: 'info',
            details: message
        })
        await newLog.save();
        this.logger.log(`info: ${time}-> ${message}`);
    }

    async error(message = '') {
        const time = moment().format('DD-MM-YY hh:mm:ss');
        const newLog = new Logs({
            level: 'error',
            details: message
        })
        await newLog.save();
        this.logger.log(`error: ${time}-> ${message}`);
    }

    async debug(message = '') {
        const time = moment().format('DD-MM-YY hh:mm:ss');
        const newLog = new Logs({
            level: 'debug',
            details: message
        })
        await newLog.save();
        this.logger.log(`debug: ${time}-> ${message}`);
    }

    async getAllLogs() {
        const logs = await Logs.find({});
        return logs;
    }
}
