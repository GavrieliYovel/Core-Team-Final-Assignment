const { Router } = require("express");
const {BIDataController} = require("../controllers/BIDataController");


const BIDataRouter = new Router();

//Billing BI
BIDataRouter.get("/MRR/:month/:year", BIDataController.getMRR );
BIDataRouter.get("/ARR/:year", BIDataController.getARR );
BIDataRouter.get("/payments/:month/:year", BIDataController.getPaymentsByMonth );

// Growth BI
BIDataRouter.get("/experiments/:month/:year", BIDataController.getMonthlyExperiments );
// BIDataRouter.get("/distribution/:device", BIDataController.getDistributionByDevice );
// BIDataRouter.get("/distribution/:location", BIDataController.getDistributionByGeo );


module.exports = { BIDataRouter };