const amqp = require('amqplib/callback_api');
const {Log} = require('./models/logger');

const listenToQ = () => {
    const q = 'CloudAMQP';
    console.log('waiting for a logs from loggers', q);
    amqp.connect(process.env.LISTEN_LOGGER, (err, conn) => {
        conn.createChannel((error, ch) => {
            ch.consume(q, async (msg) => {
                const qm = (JSON.parse(msg.content.toString()));
                const newLog = new Log({
                    level: qm.level,
                    details: qm.details
                });
                await newLog.save();
                console.log(`received log`);
            }, {noAck: true});
        });
    });
}

module.exports = {listenToQ}
