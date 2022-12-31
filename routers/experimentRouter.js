const { Router } = require('express');
const { experimentController } = require('../controllers/experimentController');

const experimentRouter = new Router();

//GET
experimentRouter.get('/experiment/:id/statistics', experimentController.experimentStatistics);

//POST
experimentRouter.post('/experiment/new', experimentController.createExperiment);

//PUT
experimentRouter.put('/experiment/update', experimentController.updateExperiment);
experimentRouter.put('/experiment/end', experimentController.endExperiment);

module.exports = { experimentRouter };
