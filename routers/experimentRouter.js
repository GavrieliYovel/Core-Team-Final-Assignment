const { Router } = require('express');
const { experimentController } = require('../controllers/experimentController');

const experimentRouter = new Router();

//GET
experimentRouter.get('/experiment/:id/statistics', experimentController.experimentStatistics);
experimentRouter.get('/experiment/:account', experimentController.experimentsByAccount);

//POST
experimentRouter.post('/experiment/new', experimentController.createExperiment);

//PUT
experimentRouter.put('/experiment/update', experimentController.updateExperiment);
experimentRouter.put('/experiment/end', experimentController.endExperiment);

//DELETE
experimentRouter.delete('/experiment/:id', experimentController.deleteExperiment);

module.exports = { experimentRouter };
