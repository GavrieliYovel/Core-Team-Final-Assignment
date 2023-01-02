const { Router } = require("express");
const {BIDataController} = require("../controllers/BIDataController");


const BIDataRouter = new Router();

//Billing BI
BIDataRouter.get("/MRR/:month", BIDataController.getMRR );
BIDataRouter.get("/ARR/:year", BIDataController.getARR );
// Get number of succeeded/ failed payments we had this month
BIDataRouter.get("/payments/:month", BIDataController.getTypeOfPayments );

// Growth BI
BIDataRouter.get("/experiments/:month", BIDataController.getMonthlyExperiments );
BIDataRouter.get("/distribution/:device", BIDataController.getDistributionByDevice );
BIDataRouter.get("/distribution/:geo", BIDataController.getDistributionByGeo );


module.exports = { BIDataRouter };