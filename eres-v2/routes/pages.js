const express = require('express')
const Page = require('./../models/page')
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
router.get('/LunchMenu', (req, res) => {
    // res.send('In pages')
    res.render('pages/lunch-menu')
})
router.get('/BookTable', (req, res) => {
    // res.send('In pages')
    res.render('pages/book-table')
})
router.get('/BookConfirmation', (req, res) => {
    // res.send('In pages')
    res.render('pages/book-confirmation')
})
router.post('/', (req, res) =>{
const page = new Page({
})
}

)

module.exports = router 