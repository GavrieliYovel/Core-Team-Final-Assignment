const Logger = require('./abtest-logger');

const logger = new Logger('mongodb+srv://coreteam:bVZR3Is9VfhlDFv1@cluster0.1cxlyo9.mongodb.net/logger?retryWrites=true&w=majority');



await logger.log('check');

