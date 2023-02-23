# ABTest Logger

A simple logging library that uses browser-js console.log() and saves the logs to your mongoDB database.
Using RMQueue to transfer the logs into your server to save it mongoDB
## Setup

```
const Logger = require('./abtest-logger');
const logger = new Logger('rabbitmqLink');
```


## Methods

```
logger.info('inforamtion about the code')
//=> info: 19-02-23 02:43:50-> inforamtion about the code

logger.error('errors')
//=> error: 19-02-23 02:43:50-> errors

logger.debug('debug purposes')
//=> debug: 19-02-23 02:43:50-> debug purposes

```









