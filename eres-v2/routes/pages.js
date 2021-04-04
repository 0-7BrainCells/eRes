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

router.post('/register', (req, res) =>{
// const page = new Page({
     console.log(req.body.password)
})



module.exports = router 