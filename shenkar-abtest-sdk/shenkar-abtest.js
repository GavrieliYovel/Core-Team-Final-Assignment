const axios = require("axios");

class ABTestSDK {
    account_id;
     constructor(email, password){
         axios.post("https://core-team-final-assignment-dev.onrender.com/IAM/login", {
             "email": email,
             "password": password
         })
             .then(response => {
                 // console.log(response.data.account);
                 this.account_id = response.data.account;
             })
             .catch(response =>{
                 console.log("Failed to login");
             })
     }

     getAccountID(){
         return this.account_id;
     }

    async getVariant(id,attributes){
        await axios.post("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/"+id, {
            attributes
        })
            .then(response => {
                return response.data;
            })
            .catch(fail => {
                return "wrong ";
            })
    }
    async declareGoal(id,attributes){
        await axios.post("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/goal/"+id, {
            attributes
        })
            .then(response => {
                return response.data;
            })
            .catch(fail => {
                return "wrong ";
            })
    }

    #filterRequest(req){

    }

}

module.exports = ABTestSDK;
