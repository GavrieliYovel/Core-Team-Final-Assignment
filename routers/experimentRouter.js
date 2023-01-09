const { Router } = require('express');
const { experimentController } = require('../controllers/experimentController');

const experimentRouter = new Router();

//GET
experimentRouter.get('/experiment/account/:account/AB', experimentController.ABTestExperimentsByAccount);
experimentRouter.get('/experiment/account/:account/FF', experimentController.FeatureFlagExperimentsByAccount);
experimentRouter.get('/experiment/account/:account', experimentController.experimentsByAccount);
experimentRouter.get('/experiment/:id/statistics', experimentController.experimentStatistics);
experimentRouter.get('/experiment/:id/variantCount', experimentController.getVariantCountById);
experimentRouter.get('/experiment/:id/callCount', experimentController.getCallCountById);
experimentRouter.get('/experiment/:id', experimentController.getExperimentById);

//POST
experimentRouter.post('/experiment/new', experimentController.createExperiment);
experimentRouter.post('/experiment', experimentController.callExperiment);

//PUT
experimentRouter.put('/experiment/end/:id', experimentController.endExperiment);
experimentRouter.put('/experiment/goal/:id', experimentController.declareGoal);
experimentRouter.put('/experiment/:id', experimentController.updateExperiment);


//DELETE
experimentRouter.delete('/experiment', experimentController.deleteExperiment);

module.exports = { experimentRouter };
