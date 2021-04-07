const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const UserController = require('../controllers/UserController')

router.post('/customer-login-received', UserController.customer_login_post)

router.post('/customer-register-received', UserController.customer_register_post)

router.post('/staff-login-received', UserController.staff_login_post)

router.post('/staff-register-received', UserController.staff_register_post)

router.post('/staff-account-removed', UserController.staff_remove_account)

module.exports = router;