const moment = require('moment');
const amqp = require('amqplib/callback_api');

module.exports = class Logger{
    constructor(link) {
        if (!Logger._instance) {
            this.logger = console;
            this.RMQueueLink = link;
            this.logs = [];
            amqp.connect(this.RMQueueLink, (err, conn) => {
                if (err) {
                    console.error('Failed to connect to RabbitMQ:', err);
                    return;
                }
                conn.createChannel((err, ch) => {
                    if (err) {
                        console.error('Failed to create channel:', err);
                        return;
                    }
                    this.channel = ch;
                    ch.assertQueue('CloudAMQP', { durable: false });
                });
            });
            setInterval(async () => {
                if (this.logs.length > 0) {
                    try {
                        await this.#sendLogsToServer();
                    } catch (error) {
                        console.log("failed to send logs")
                    }
                }
            }, 10000); // Send logs to server after every minute
            Logger._instance = this;
        } else {
            return Logger._instance;
        }
    }
    async #sendLogsToServer() {
        try {
            const stringMsg = JSON.stringify(this.logs);
            await this.channel.sendToQueue('CloudAMQP', Buffer.from(stringMsg));
            this.logs = []
        } catch (error) {
            console.log("Failed to send message:", error);
        }
    };


    log(level, message) {
        const time = moment().format('DD-MM-YY hh:mm:ss');
        const newLog = {
            level: level,
            details: message,
            date: new Date()
        }
        this.logs.push(newLog);
        this.logger.log(`${level}: ${time}-> ${message}`);
    }

    info(message = '') {
        this.log('info', message);
    }

    error(message = '') {
        this.log('error', message);
    }

    debug(message = '') {
        this.log('debug', message);
    }

}
