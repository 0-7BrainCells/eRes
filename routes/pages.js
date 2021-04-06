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
router.get('/Customer', (req, res) => {
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

router.get('/BookTable', (req, res) => {
  res.render('book-table')
}),

router.get('/BookConfirmation', (req, res) => {
  res.render('booking-confirmation')
}),

router.post('/', (req, res) =>{
  res.render('index')
}) 


module.exports = router 