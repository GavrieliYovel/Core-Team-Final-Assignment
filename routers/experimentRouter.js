const { Router } = require('express');
const { experimentController } = require('../controllers/experimentController');

const experimentRouter = new Router();

//GET
experimentRouter.get('/experiment/account/:account/AB', experimentController.ABTestExperimentsByAccount);
experimentRouter.get('/experiment/account/:account/FF', experimentController.FeatureFlagExperimentsByAccount);
experimentRouter.get('/experiment/account/:account/experimentCalls', experimentController.experimentCallsByAccount);
experimentRouter.get('/experiment/account/:account', experimentController.experimentsByAccount);
experimentRouter.get('/experiment/:id/goal/:gid/variantSuccess', experimentController.getVariantSuccessById);
experimentRouter.get('/experiment/:id/requestPerAtt', experimentController.getRequestPerAttributeById);
experimentRouter.get('/experiment/:id/variantExpose', experimentController.getVariantExposeById);
experimentRouter.get('/experiment/:id', experimentController.getExperimentById);
experimentRouter.get('/account', experimentController.getAccountDetails);

//POST
experimentRouter.post('/experiment/new', experimentController.createExperiment);
experimentRouter.post('/experiment/run', experimentController.getVariant);

//PUT
experimentRouter.put('/experiment/:id/terminate', experimentController.terminateExperiment);
experimentRouter.put('/experiment/goal/', experimentController.reportGoal);
experimentRouter.put('/experiment/:id', experimentController.updateExperiment);

module.exports = { experimentRouter };
