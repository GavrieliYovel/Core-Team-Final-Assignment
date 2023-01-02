const { Router } = require('express');
const { IAMController } = require('../controllers/IAMController');

const IAMRouter = new Router();

//GET
IAMRouter.get('/login', IAMController.login);
// IAMRouter.get('/register', IAMController.IAMregister);


module.exports = { IAMRouter: IAMRouter };
