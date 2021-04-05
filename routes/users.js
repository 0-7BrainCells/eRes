const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const UserController = require('../controllers/UserController')

router.post('/customer-login-received', UserController.customer_login_post)

router.post('/customer-register-received', UserController.customer_register_post)

router.post('/staff-login-received', UserController.staff_login_post)
    

module.exports = router;