const { Router } = require("express");
const {BIDataController} = require("../controllers/BIDataController");


const BIDataRouter = new Router();

//Billing BI
BIDataRouter.get("/ARR/:year", BIDataController.getARR );
BIDataRouter.get("/MRR/:year/:month", BIDataController.getMRR );
BIDataRouter.get("/DRR/:year/:month/:day", BIDataController.getDRR );
BIDataRouter.get("/payments/:year/:month", BIDataController.getPaymentsByMonth );

// Growth BI
BIDataRouter.get("/experiments/:year/:month", BIDataController.getMonthlyExperiments );
// BIDataRouter.get("/distribution/:device", BIDataController.getDistributionByDevice );
// BIDataRouter.get("/distribution/:location", BIDataController.getDistributionByGeo );


module.exports = { BIDataRouter };