const amqp = require('amqplib/callback_api');
const {Log} = require('./models/logger');

const listenToQ = () => {
    const q = 'CloudAMQP';
    console.log('waiting for a logs from loggers', q);
    try {
        amqp.connect(process.env.LISTEN_LOGGER, (err, conn) => {
            try {
                conn.createChannel((error, ch) => {
                    try{
                        ch.consume(q, async (msg) => {
                            const qm = (JSON.parse(msg.content.toString()));
                            for (const log of qm) {
                                const newLog = new Log({
                                    level: log.level,
                                    details: log.details,
                                    date: log.date
                                });
                                await newLog.save();
                                console.log(`received log`);
                            }
                        }, {noAck: true});
                    } catch (error) {
                        console.log("failed to listen")
                    }
                });
            } catch(error) {
                console.log("failed receiving a message")
            }
        });
    } catch (error) {
        console.log("failed to listen");
    }

}

module.exports = {listenToQ}
