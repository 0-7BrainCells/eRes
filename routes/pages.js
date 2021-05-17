const express = require('express')
const router = express.Router()
const BookingController = require('../controllers/BookingController')
const OrderController = require('../controllers/OrderController')
const Booking = require('../model/Booking')
const Order = require('../model/Order')


//Page redirect action handlers:

router.get('/StaffLogin', checkStaffNotAuthenticated, checkUserNotAuthenticated, (req, res) => {
    res.render('staff/staff-login')
}), 
router.get('/CustomerLogin', checkUserNotAuthenticated, checkStaffNotAuthenticated, (req, res) => {
    res.render('index/customer-login')
}), 

router.get('/CustomerRegistration', checkUserNotAuthenticated, checkStaffNotAuthenticated, (req, res) => {
    res.render('index/customer-rego')
}),  

router.get('/CustomerHomePage', checkUserAuthenticated, BookingController.initialize_booking, OrderController.initialize_orders, BookingController.expire_bookings, (req, res) => {
  res.render('user/customer-successful', {user: req.user})
}),

router.get('/BookTable', checkUserAuthenticated, (req, res) => {
  res.render('user/book-table', {user: req.user})
}), 
router.get('/BookingRecord', checkUserAuthenticated, BookingController.list_all_bookings_user);

router.get('/CustomerSettings', checkUserAuthenticated, (req, res) => {
  res.render('user/customer-settings');
}),

router.get('/UpdateCustomer', checkUserAuthenticated, (req, res) => {
  res.render('user/update-customer');
}),

router.get('/StaffRegistration', checkStaffAuthenticated, checkUserNotAuthenticated, (req, res) => {
  res.render('staff/admin/manage-staff-customers/staff-rego');
}),

router.get('/StaffManagement', checkStaffAuthenticated, (req, res) => {
  res.render('staff/admin/staff-management');
}),

router.get('/StaffLayout', checkStaffAuthenticated, (req, res) => {
  res.render('staff/staff-successful', {user : req.user});
}),

router.get('/EditDiscount', checkStaffAuthenticated, (req, res) => {
  res.render('staff/admin/edit-discount');
}),

router.get('/EditCustomer', checkStaffAuthenticated, (req, res) => {
  res.render('staff/admin/manage-staff-customers/edit-customer');
}),

router.get('/RemoveStaff', checkStaffAuthenticated, (req, res) => {
  res.render('staff/admin/manage-staff-customers/remove-staff')
}),
router.get('/DisplayCustomer', checkUserAuthenticated, (req, res) => {
  res.render('staff/admin/manage-staff-customers/display-customer')
}),

router.get('/EditMenu', checkStaffAuthenticated, (req, res) => {
  res.render('staff/admin/edit-menu')
}),

router.get('/AddLunchMenuItem', checkStaffAuthenticated, (req, res) => {
  res.render('staff/admin/edit-menu/add-lunch-menu-item')
}),

router.get('/ViewBookingStaff', checkStaffAuthenticated, BookingController.list_all_bookings)

router.get('/ViewOrderStaff', checkStaffAuthenticated, OrderController.list_all_orders)

router.get('/RemoveLunchMenuItem', checkStaffAuthenticated, (req, res) => {
  res.render('staff/admin/edit-menu/remove-lunch-menu-item')
}),

router.get('/AddDinnerMenuItem', checkStaffAuthenticated, (req, res) => {
  res.render('staff/admin/edit-menu/add-dinner-menu-item')
}),

router.get('/RemoveDinnerMenuItem', checkStaffAuthenticated, (req, res) => {
  res.render('staff/admin/edit-menu/remove-dinner-menu-item')
}),

router.get('/', checkUserNotAuthenticated, checkStaffNotAuthenticated, (req, res) => {
  res.render('index')
})

router.delete('/customer-logout', OrderController.delete_unconfirmed_orders, BookingController.delete_unconfirmed_booking, (req, res) => {
  req.session.destroy()
  req.logOut()
  res.redirect('/')
})

router.delete('/staff-logout', OrderController.delete_unconfirmed_orders, BookingController.delete_unconfirmed_booking, (req, res) => {
  req.session.destroy()
  req.logOut()
  res.redirect('/')
})

function checkUserAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.type == 'user') {
    return next()
  }
  res.redirect('/CustomerLogin')
}

function checkUserNotAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.type == 'user') {
    return res.redirect('/CustomerHomePage')
  }
  next()
}

function checkStaffAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.type == 'staff') {
    return next()
  }
  res.redirect('/StaffLogin')
}

function checkStaffNotAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.type == 'staff') {
    return res.redirect('/StaffLayout')
  }
  next()
}

module.exports = router 