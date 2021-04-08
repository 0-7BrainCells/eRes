const express = require('express')
const router = express.Router()

//Page redirect action handlers:

router.get('/StaffLogin', (req, res) => {
    res.render('staff/staff-login')
}), 
router.get('/CustomerLogin', (req, res) => {
    res.render('index/customer-login')
}), 
router.get('/Customer', (req, res) => {
  res.render('index/customer-login')
}), 

router.get('/CustomerRegistration', (req, res) => {
    res.render('index/customer-rego')
}), 

router.get('/CustomerHomePage', (req, res) => {
  res.render('user/customer-successful')
}), 

router.get('/BookTable', (req, res) => {
  res.render('user/book-table')
}), 


router.get('/LunchMenu', (req, res) => {
    res.render('user/lunch-menu')  
}), 

router.get('/DinnerMenu', (req, res) => {
  res.render('user/dinner-menu')   
}), 

router.get('/StaffRegistration', (req, res) => {
  res.render('staff/staff-rego');
}),

router.get('/StaffManagement', (req, res) => {
  res.render('staff/admin/staff-management');
}),

router.get('/StaffLayout', (req, res) => {
  res.render('staff/staff-successful');
}),

router.get('/EditCustomer', (req, res) => {
  res.render('staff/admin/edit-customer');
}),

router.get('/RemoveStaff', (req, res) => {
  res.render('staff/admin/remove-staff')
}),

router.post('/', (req, res) =>{
  res.render('index')
})






module.exports = router 