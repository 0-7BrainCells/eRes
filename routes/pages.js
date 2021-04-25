const express = require('express')
const LunchMenu = require('../model/LunchMenu')
const router = express.Router()

//Page redirect action handlers:

router.get('/StaffLogin', (req, res) => {
    res.render('staff/staff-login')
}), 
router.get('/CustomerLogin', (req, res) => {
    res.render('index/customer-login')
}), 

router.get('/CustomerRegistration', (req, res) => {
    res.render('index/customer-rego')
}),  
router.get('/LoginUnsuccessful', (req, res) => {
  res.render('user/customer-login-unsuccessful')
}), 
router.get('/CustomerHomePage', (req, res) => {
  res.render('user/customer-successful', {user: req.user})
}),
router.get('/CustomerCheckout', (req, res) => {
  res.render('user/total-checkout')
}),
router.get('/BookTable', (req, res) => {
  res.render('user/book-table', {user: req.user})
}), 

router.get('/StaffRegistration', (req, res) => {
  res.render('staff/admin/manage-staff-customers/staff-rego');
}),

router.get('/StaffManagement', (req, res) => {
  res.render('staff/admin/staff-management');
}),

router.get('/StaffLayout', (req, res) => {
  res.render('staff/staff-successful');
}),

router.get('/EditDiscount', (req, res) => {
  res.render('staff/admin/edit-menu/edit-discount');
}),

router.get('/EditCustomer', (req, res) => {
  res.render('staff/admin/manage-staff-customers/edit-customer');
}),

router.get('/RemoveStaff', (req, res) => {
  res.render('staff/admin/manage-staff-customers/remove-staff')
}),

router.get('/EditMenu', (req, res) => {
  res.render('staff/admin/edit-menu')
}),

router.get('/AddLunchMenuItem', (req, res) => {
  res.render('staff/admin/edit-menu/add-lunch-menu-item')
}),

router.get('/RemoveLunchMenuItem', (req, res) => {
  res.render('staff/admin/edit-menu/remove-lunch-menu-item')
}),

router.get('/AddDinnerMenuItem', (req, res) => {
  res.render('staff/admin/edit-menu/add-dinner-menu-item')
}),

router.get('/RemoveDinnerMenuItem', (req, res) => {
  res.render('staff/admin/edit-menu/remove-dinner-menu-item')
}),

router.post('/', (req, res) =>{
  res.render('index')
})






module.exports = router 