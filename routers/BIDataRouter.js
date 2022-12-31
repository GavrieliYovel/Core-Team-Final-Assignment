const { Router } = require("express");
const {BIDataController} = require("../controllers/BIDataController");



const BIDataRouter = new Router();

//GET
//Get registered users per day/month
BIDataRouter.get();

//Get total credits usage per day/month per user


//Billing BI
BIDataRouter.get("/MRR/:month", BIDataController.MRR );
BIDataRouter.get("/ARR/:year", BIDataController.ARR );

// Get number of succeeded/ failed payments we had this month
BIDataRouter.get("/payments/:month", BIDataController.payments );


module.exports = { BIDataRouter };