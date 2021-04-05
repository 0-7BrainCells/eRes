const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../model/User');
const Staff = require('../model/Staff');

router.get('/StaffLogin', (req, res) => {
    res.render('staff-login')
}), 
router.get('/CustomerLogin', (req, res) => {
    res.render('customer-login')
}), 
router.get('/CustomerRegistration', (req, res) => {
    res.render('customer-rego')
}), 

router.get('/LunchMenu', (req, res) => {
  res.render('views/lunch-menu')  // this is not working
}), 
router.get('/DinnerMenu', (req, res) => {
  res.render('dinner-menu')   // this is not working
}), 

router.post('/staff-login-received', (req, res) => {
  Staff.findOne({
    ID: req.body.ID,
    password: req.body.password
  }, function(err, user) {
    if (err) { return res.status(500).send(err); }

    if (!user) { return res.status(200).send("User not found, check username and password are correct"); } //The email or password dont exist in the DB

    // return res.status(200).send("You are logged in succesfully. (TODO: actually make some sort of session thing with profiles");
    return res.status(200).render('staff-successful');
  }
)
}), 

router.post('/customer-login-received', (req, res) => {  //Check if the email and password combo are in the DB to verify login
	User.findOne({
        email: req.body.email,
        password: req.body.password
      }, function(err, user) {
        if (err) { return res.status(500).send(err); }
  
        if (!user) { return res.status(200).send("User not found, check username and password are correct"); } //The email or password dont exist in the DB
  
        return res.status(200).send("You are logged in succesfully. (TODO: actually make some sort of session thing with profiles)");
      }
    )
}),

router.post('/customer-register-received', (req, res) => { //This POST request will take the form data on user registration, make a user object with the schema in the User model file, then save that item into the iser database.
    User.findOne({   //Find any user where the email field matches the email user input
        email: req.body.email
      }, function(err, user) {
        if (err) { return res.status(500).send(err); }
  
        if (!user) {  //If the server cant find a matching email in the DB then create the user
            var myData = new User(req.body);
             myData.save()
                .then(item => {
                     res.send("User saved to database (TODO: direct to login page");
             })
             .catch(err => {
                     res.status(400).send("Unable to save to database");
             });  
        } else {  //If the email already exists then dont create the user, throw error. 
            return res.status(200).send("Email already exists (TODO: redirect this page to the registration again");
        }
      }
    )
    
}), 

router.post('/', (req, res) =>{
}) 


module.exports = router 