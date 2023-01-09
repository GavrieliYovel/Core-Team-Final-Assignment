# Core-Team-Final-Assignment-Phase 1

Our project is part of a complete system, which our main assignment is to wrap the parts that make it up.

## Our Ownership
### Authentication:
We are in charge of authentication -  who can make changes in the system and view certain parts of it - who has the access to different parts of the system.

### BI data:
We are also responsible for business intelligence (BI) data statistics and their usage, which only certain roles can access.
* Monthly Recurring Revenue (MRR).
* Annual Recurring Revenue (ARR).
* The amount of successful or failed payments we had this month.
* The amount of experiments running per month.


![image](https://user-images.githubusercontent.com/77021357/211335396-8376b323-6985-4b06-b59f-b7042ecfdccb.png)



## User Interaction With Growth API
An end user has a couple of options regarding the experiments page: 
1. Add new experiment 
2. Manage experiment 

No matter what he chooses, the IAM team has to check whether he is authorized. If he isn't, than his access denied. Otherwise he has access to growth api.


## Dependencies
* IAM - when login through IAM, the user receives token 
* Growth -  


## Flow
The best way to explain our flow is by showing our sequence diagram:

![image](https://user-images.githubusercontent.com/77021357/211335189-03122d35-c391-47da-95d2-3c97cddf65b0.png)

If the axios request fail When creating an experiment, we are using user mock data.



### Glossary 
* Mock data - We used the schemas of the different groups in order to use mock data (JSON file)
  
## User Guide
1. 

api - 
sdk

## Our team
* Yovel Gavrieli
* Abrahem Elnkeeb
* Liran Michaelov
* Waleed Younis
* Viki Bril
* Gilad Schneider

