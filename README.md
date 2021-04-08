# eRes
SES Online Restaurant Web Application 

**Version Information: Pre- Release v0.0.0**

**Using Express -> Node.js with MongoDB****

**Dev dependancies:**
- nodemon
- bcrpyt
- ejs
- express
- mongoose

**Current functionality:**

  Navigate a home page

  Fill out customer registration form, user saving to database

  Customer login, email validation against database
  
  Navigate between Lunch and Dinner Menu's to browse items
  
  Staff login with ID validation
  
---------------------------------------------------------------------------------------------------------------------------------------------------------------------


**History:**

4/4: Updated the rego form and merged Henry_Dev/Rups_Dev changes into the main repo. See discord for further details about this merge and what you will have to do :) *just try to push your own offline branch onto here and I (Henry) will take a look at the changes between it and main just to see if there are any major conflicts before adding)

---------------------------------------------------------------------------------------------------------------------------------------------------------------------



4/4: Added some verification for registration (checking if the email already exists) and login (checking if the combination of email and password already exist). Currently they just show an error message if login or registration fails verification check, however will need to in future link to the appropriate views (if rego fails link back to rego)


---------------------------------------------------------------------------------------------------------------------------------------------------------------------

4/4: Linked user registration to Database, so now when a user inputs username and password it will create an object using the schema and send that object into the database (cloud based always running).  Picture below shows the database populated with some test inputs. (MongoDB Compass with login credentials user: admin, pass: admin)

![Capture](https://user-images.githubusercontent.com/79623665/113500027-40b4fe80-955e-11eb-893f-bff72c81901a.PNG)


---------------------------------------------------------------------------------------------------------------------------------------------------------------------


4/4: Added post requests for basic username and password input fields on customer login and rego and staff login. 
Terminal will show the data is received, now just need to link the user info into the database for users and validate against registered users on login. 

1. Entering info into the customer registration form (form needs to be further elaborated but good for basic view now)

![Pic1](https://user-images.githubusercontent.com/79623665/113498411-0f353680-9550-11eb-9029-107513d6cbdd.PNG)

2. Submitting the form, shows that POST request was received by the server, check the terminal to see the fields stored as local variables. 

![Pic2](https://user-images.githubusercontent.com/79623665/113498428-3429a980-9550-11eb-80c1-fffdd68e5595.PNG)

3. Terminal showing the local variables. Next step is to setup the DB schema for users and submit the user objects into the database to store them. 

![Pic3](https://user-images.githubusercontent.com/79623665/113498429-3b50b780-9550-11eb-92b0-f03a164eb1b0.PNG)

