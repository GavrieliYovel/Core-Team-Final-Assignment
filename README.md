# Core-Team-Final-Assignment-Phase 1

Our project is part of a complete system, which our main assignment is to wrap the parts that make it up.

## Our Ownership
### Authentication:
Using the data we get from the IAM Team that in charge of authentication -  We can decide who has access to different parts of the system by the user assests we recieve.

### BI data:
We are also responsible for business intelligence (BI) data statistics and their usage, which only certain roles can access.
* Monthly Recurring Revenue (MRR).
* Annual Recurring Revenue (ARR).
* The amount of successful or failed payments we had this month.
* The amount of experiments running per month.


![image](https://user-images.githubusercontent.com/77021357/211335396-8376b323-6985-4b06-b59f-b7042ecfdccb.png)



### User Interaction With Growth API
An end user has a number of options regarding the experiments page: 
1. **C**reate experiment 
2. **R**ead experiment (all or by type)
3. **U**pdate experiment
4. **D**elete experiment 
5. Run experiment
6. Decalre goal
7. Get call/variant count
8. Get experiment statistics

No matter what he chooses, the IAM team has to check whether he is authorized. If he isn't, than his access denied. Otherwise he has access to growth api.


## Dependencies
* IAM - when login through IAM, the user receives token 
* Growth - all the business logic of the system. We export all their methods. 


## Flow
The best way to explain our flow is by showing our sequence diagram:

![image](https://user-images.githubusercontent.com/77021357/211335189-03122d35-c391-47da-95d2-3c97cddf65b0.png)

If the axios request failed, we are using user mock data.



### Glossary 
* Experiment - In our system we have two types of experiments. AB test, Feature Flag.
* Mock data - We used the schemas of the different groups in order to use mock data (JSON file).
* Variant -  In each Experiment we have different options based on the type. (AB test {A,B,C}, Feature Flag {ON, OFF}).


## User Guide - API
### Before
1. Check out the [API documentation](https://documenter.getpostman.com/view/24149790/2s8Z75RpFi#5e503b8e-7465-44a5-88cf-1e04f789d857)

### Setup - Localhost
1. Clone git repoitory: git clone https://github.com/GavrieliYovel/Core-Team-Final-Assignment.git
2. Add .env file
3. Run npm install
4. Run npm run start
5. Open browser and type in the url: "http://localhost:3030/"
6. Login with: *Username*: yovgav6@gmail.com *Password*: Aa123456

### Setup - Render with mock data 
1. Open [Render Dev](https://core-team-final-assignment-dev.onrender.com)
2. Login with: *Username*: yovgav6@gmail.com *Password*: Aa123456

### Setup - Render live data
1. Open [Render](https://core-team-final-assignment-dev.onrender.com)
2. Login with: *Username*: yovgav6@gmail.com *Password*: Aa123456

### Application use cases:
#### Create Experiment:
  1. Click on add new experiment
  2. Fill the form with the wanted information
  3. Click save

#### Edit Experiment:
  1. Choose an experiment
  2. Click on edit
  3. Fill the form where you want to change
  4. Click Save

#### Delete Experiment:
  1. Choose an experiment
  2. Click on delete


## User Guide - SDK
### Before
  1. All the function need to be async await functions

### Setup
  1. const ABTestSDK = require('shenkar-abtest')
  2. const ab = new ABTestSDK(*accountId*) //Working accountId: 63b9fddd93e055aa3b92bf69

### SDK Functions
#### getAllExperiments()
  1. ab.getAllExperiments()
  2. return an array of all experiments attach to the accountId
  
#### getABExperiments()
  1. ab.getABExperiments()
  2. return an array of all the AB experiments attach to the accountId
  
#### getFFExperiments()
  1. ab.getFFExperiments()
  2. return an array of all the Feature Flag experiments attach to the accountId
  
#### callExperiment(experiment_id)
  1. ab.callExperiment(experiment_id)
  2. return a random variant of the experiment

#### declareGoal(experiment_id, variant)
  1. ab.declareGoal(experiment_id, variant)
  2. add to the variant success count 
  
## Our team
* Yovel Gavrieli
* Abrahem Elnkeeb
* Liran Michaelov
* Waleed Younis
* Viki Bril
* Gilad Schneider

