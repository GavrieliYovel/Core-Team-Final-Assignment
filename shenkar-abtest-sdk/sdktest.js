const ABTestSDK = require('./shenkar-abtest.js');
const ab = new ABTestSDK("yovgav6@gmail.com", "Aa123456");

// console.log(ab.getAllExperiments())
// "yovgav6@gmail.com", "Aa123456"
// async function login() {
//     try {
//         value = await ab.login("yovgav6@gmail.com", "Aa123456");
//         console.log(value)
//     } catch {
//         console.log("ASVASVS")
//     }
// }
// login()
console.log(ab.account_id);
// console.log(ab.deleteExperiment(2));