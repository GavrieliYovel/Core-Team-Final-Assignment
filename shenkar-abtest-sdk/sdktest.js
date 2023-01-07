const ABTestSDK = require('./shenkar-abtest.js');
const ab = new ABTestSDK("yovgav6@gmail.com","Aa123456");
// console.log(ab.account_id)
console.log(ab.getAccountID());
// console.log(ab.deleteExperiment(2));