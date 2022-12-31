const { Router } = require('express');
const { experimentController } = require('../controllers/experimentController');

const experimentRouter = new Router();

//GET
experimentRouter.post('/experiment/new', experimentController.createExperiment);

module.exports = { experimentRouter };
