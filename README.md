# Core-Team-Final-Assignment-Phase 1

Our project is part of a complete system, which our main assignment is to wrap the parts that make it up.

## Description
### Authentication:
Using the data we get from the IAM Team that in charge of authentication -  We can decide who has access to different parts of the system by the user assests we recieve.

### BI data:
We are also responsible for business intelligence (BI) data statistics and their usage, which only certain roles can access.
* Monthly Recurring Revenue (MRR).
* Annual Recurring Revenue (ARR).
* The amount of successful or failed payments we had this month.
* The amount of experiments running per month.

### Glossary 
* Experiment - In our system we have two types of experiments. AB test, Feature Flag.
* Mock data - We used the schemas of the different groups in order to use mock data (JSON file).
* Variant -  In each Experiment we have different options based on the type. (AB test {A,B,C}, Feature Flag {ON, OFF}).

## Setup and usage guide for our project
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
  2. Before callExperiment and declareGoal use get method to use experimentId for them.

### Setup
  1. const ABTestSDK = require('shenkar-abtest')
  2. const ab = new ABTestSDK(api-key)

### SDK Functions
#### getVariant(experiment_id)
get a variant for a specific experiment.
id from the dashboard.
  
#### reportGoal(goal_id)
reporting that a goal was reached.
id from the dashboard.
  
  
## Our team
* Yovel Gavrieli
* Abrahem Elnkeeb
* Liran Michaelov
* Waleed Younis
* Viki Bril
* Gilad Schneider

