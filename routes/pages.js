const express = require('express')
const router = express.Router()
const BookingController = require('../controllers/BookingController')
const OrderController = require('../controllers/OrderController')
const Booking = require('../model/Booking')
const Order = require('../model/Order')


//Page redirect action handlers:

router.get('/StaffLogin', (req, res) => {
    res.render('staff/staff-login')
}), 
router.get('/CustomerLogin', checkNotAuthenticated, (req, res) => {
    res.render('index/customer-login')
}), 

router.get('/CustomerRegistration', checkNotAuthenticated, (req, res) => {
    res.render('index/customer-rego')
}),  
router.get('/LoginUnsuccessful', (req, res) => {
  res.render('user/customer-login-unsuccessful')
}), 
router.get('/CustomerHomePage', checkAuthenticated, (req, res) => {
  res.render('user/customer-successful', {user: req.user})
}),

router.get('/BookTable', checkAuthenticated, (req, res) => {
  res.render('user/book-table', {user: req.user})
}), 
router.get('/BookingRecord', (req, res) => {
  res.render('user/booking-record')
}), 
router.get('/SelectTable', (req, res) => {
  res.render('user/select-table')
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
router.get('/DisplayCustomer', (req, res) => {
  res.render('staff/admin/manage-staff-customers/display-customer')
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

router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('index')
})

router.delete('/customer-logout', OrderController.delete_unconfirmed_orders, BookingController.delete_unconfirmed_booking, (req, res) => {
  req.logOut()
  res.redirect('/')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/CustomerLogin')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/CustomerHomePage')
  }
  next()
}

module.exports = router 