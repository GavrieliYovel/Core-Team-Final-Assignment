const { Router } = require('express');
const { experimentController } = require('../controllers/experimentController');

const experimentRouter = new Router();

//GET
experimentRouter.get('/experiment/:id/statistics', experimentController.experimentStatistics);
experimentRouter.get('/experiment/:account/AB', experimentController.ABTestByAccount);
experimentRouter.get('/experiment/:account/FF', experimentController.FeatureFlagByAccount);
experimentRouter.get('/experiment/:account', experimentController.experimentsByAccount);

//POST
experimentRouter.post('/experiment/new', experimentController.createExperiment);
experimentRouter.post('/experiment/:id', experimentController.callExperiment);
experimentRouter.post('/experiment/goal/:id', experimentController.declareGoal);

//PUT
experimentRouter.put('/experiment/end/:id', experimentController.endExperiment);
experimentRouter.put('/experiment/:id', experimentController.updateExperiment);

//DELETE
experimentRouter.delete('/experiment/:id', experimentController.deleteExperiment);

module.exports = { experimentRouter };
