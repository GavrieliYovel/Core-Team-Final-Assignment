const { Router } = require('express');
const { loggerController } = require('../controllers/loggerController');

const loggerRouter = new Router();


loggerRouter.get('/', loggerController.getAllLogs);


module.exports = { loggerRouter };
