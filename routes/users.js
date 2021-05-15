const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const passport = require('passport')

router.post('/customer-login-received', passport.authenticate('user-local', {
    successRedirect: '/CustomerHomePage',
    failureRedirect: '/CustomerLogin',
    failureFlash: true
}))

router.post('/staff-login-received', passport.authenticate('staff-local', {
    successRedirect: '/StaffLayout',
    failureRedirect: '/StaffLogin',
    failureFlash: true
}))

router.post('/customer-register-received', UserController.customer_register_post)

//router.post('/staff-login-received', UserController.staff_login_post)

router.post('/staff-register-received', UserController.staff_register_post)

router.post('/staff-account-removed', UserController.staff_remove_account)

router.post('/customer-account-updated', UserController.customer_update_account)


//router.post('/customer-account-edited', UserController.edit_customer_post)
router.post('/customer-account-removed', UserController.customer_remove_account)

module.exports = router;