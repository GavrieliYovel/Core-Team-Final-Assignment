const { Router } = require('express');
const { IAMController } = require('../controllers/IAMController');

const IAMRouter = new Router();

//GET
IAMRouter.post('/login', IAMController.login);
// IAMRouter.get('/register', IAMController.IAMregister);
IAMRouter.get('/details', IAMController.getDetails);
IAMRouter.get('/token', IAMController.getToken);
IAMRouter.get('/credits', IAMController.getCredit);
IAMRouter.put('/credits/:credit', IAMController.setCredit);

module.exports = { IAMRouter };
