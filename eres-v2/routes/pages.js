const express = require('express')
const router = express.Router()

router.get('/StaffLogin', (req, res) => {
    // res.send('In pages')
    res.render('pages/staff-login')
}), 
router.get('/CustomerLogin', (req, res) => {
    // res.send('In pages')
    res.render('pages/customer-login')
}), 
router.get('/CustomerRegistration', (req, res) => {
    // res.send('In pages')
    res.render('pages/customer-rego')
})

module.exports = router 