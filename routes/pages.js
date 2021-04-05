const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../model/User');
const Staff = require('../model/Staff');

//Page redirect action handlers:

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
    res.render('lunch-menu')  
}), 
router.get('/DinnerMenu', (req, res) => {
  res.render('dinner-menu')   
}), 




//POST req handler for staff login form. Login successful if ID and password match with entry in DB

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

//POST req handler for customer login form. Login successful if email and password match with entry in DB

router.post('/customer-login-received', (req, res) => {  
	User.findOne({
        email: req.body.email,
        password: req.body.password
      }, function(err, user) {
        if (err) { return res.status(500).send(err); }
  
        if (!user) { return res.status(200).send("User not found, check username and password are correct"); } 
  
        return res.status(200).send("You are logged in succesfully. (TODO: actually make some sort of session thing with profiles)");
      }
    )
}),

//POST req handler for customer registration form. Creates a user in DB if email is unique. 

router.post('/customer-register-received', (req, res) => { 
    User.findOne({   
        email: req.body.email
      }, function(err, user) {
        if (err) { return res.status(500).send(err); }
  
        if (!user) {  
            var myData = new User(req.body);
             myData.save()
                .then(item => {
                     res.send("User saved to database (TODO: direct to login page");
             })
             .catch(err => {
                     res.status(400).send("Unable to save to database");
             });  
        } else {  
            return res.status(200).send("Email already exists (TODO: redirect this page to the registration again");
        }
      }
    )
    
}), 

router.post('/', (req, res) =>{
}) 


module.exports = router 