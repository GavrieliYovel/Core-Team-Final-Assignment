const { Router } = require('express');
const { IAMController } = require('../controllers/IAMController');

const IAMRouter = new Router();

//GET
IAMRouter.post('/login', IAMController.login);
IAMRouter.get('/session', IAMController.getSession);
// IAMRouter.get('/register', IAMController.IAMregister);
// IAMRouter.get('/details', IAMController.getDetails);
// IAMRouter.get('/token', IAMController.getToken);
// IAMRouter.get('/credits', IAMController.getCredits);
// IAMRouter.get('/seats', IAMController.getSeats);
// IAMRouter.put('/credits/:credit', IAMController.setCredit);
// IAMRouter.put('/seats/:seat', IAMController.setSeat);

module.exports = { IAMRouter };
