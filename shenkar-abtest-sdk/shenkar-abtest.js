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

     getABExperiments(){
        axios.get("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/"+this.account_id+"/AB")
            .then(response => {
                return response.data;
            })
    }
    getFFExperiments(){
        axios.get("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/"+this.account_id+"/FF")
            .then(response => {
                return response.data;
            })
    }
    getAllExperiments(){
        axios.get("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/"+this.account_id)
            .then(response => {
                return response.data;
            })
    }

    async createExperiment(experimentDetails){
        await axios.post("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/new", {
            experimentDetails
        })
            .then(response => {
                return response.data;
            })
            .catch(fail => {
                return "wrong ";
            })
    }
    async callExperiment(id,attributes){
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

    async endExperiment(id){
        await axios.put("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/end/"+id)
            .then(response => {
                return response.data;
            })
            .catch(fail => {
                return "wrong ";
            })
    }
    async updateExperiment(id, experimentDetails){
        await axios.put("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/"+id, {
            experimentDetails
        })
            .then(response => {
                return response.data;
            })
            .catch(fail => {
                return "wrong ";
            })
    }

    async deleteExperiment(id){
        await axios.delete("https://core-team-final-assignment-dev.onrender.com/Growth/experiment/"+id)
            .then(response => {
                return response.data;
            })
            .catch(fail => {
                return "wrong ";
            })
    }
}

module.exports = ABTestSDK;