const Logger = require('./abtest-logger');
const logger = new Logger("amqps://qdniwzza:a-yzSrHM7aPJ-ySEYMc7trjzvs00QJ5b@rattlesnake.rmq.cloudamqp.com/qdniwzza");



// await logger.log('check');

logger.info("test");
logger.info("test");
logger.info("test");
logger.info("test");
logger.info("test");
logger.info("test");
logger.info("test");
logger.info("test");
logger.info("test");
logger.info("test");

// const test =  async () => {
//     logger.info("test").then(r => r);
// }
//
// try {
//     test();
// }
// catch (e) {
//     console.log(e)
// }
