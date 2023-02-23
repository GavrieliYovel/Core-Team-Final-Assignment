const moment = require('moment');
const amqp = require('amqplib/callback_api');

module.exports = class Logger{
    constructor(link) {
        if (!Logger._instance) {
            this.logger = console;
            this.RMQueueLink = link;
            Logger._instance = this;
        } else {
            return Logger._instance;
        }
    }
    async #sendLogsToServer(log) {
        amqp.connect(this.RMQueueLink, (err, conn) => {
            conn.createChannel(async (error, ch) => {
                const q = 'CloudAMQP';
                const stringMsg = JSON.stringify(log);
                ch.assertQueue(q, { durable: false });
                await ch.sendToQueue(q, Buffer.from(stringMsg));
            });
        });
    };



    async info(message = '') {
        const time = moment().format('DD-MM-YY hh:mm:ss');
        const newLog = {
            level: 'info',
            details: message
        }
        await this.#sendLogsToServer(newLog);
        this.logger.log(`info: ${time}-> ${message}`);
    }

    async error(message = '') {
        const time = moment().format('DD-MM-YY hh:mm:ss');
        const newLog = {
            level: 'error',
            details: message
        }
        await this.#sendLogsToServer(newLog);
        this.logger.log(`error: ${time}-> ${message}`);
    }

    async debug(message = '') {
        const time = moment().format('DD-MM-YY hh:mm:ss');
        const newLog = {
            level: 'debug',
            details: message
        }
        await this.#sendLogsToServer(newLog);
        this.logger.log(`debug: ${time}-> ${message}`);
    }

    async getAllLogs() {
        const logs = await Logs.find({});
        return logs;
    }
}
