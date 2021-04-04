// THIS ALSO HOLDS ALL THE PAGES, THIS WILL ILLUSTRATE THE ROUTES SHOWN IN THE URL (2/3)

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
    res.render('pages/lunch-menu')      // EXMAPLE this will show in the url and the res.render(...) is the fucntion that allows this to happen
})
router.get('/DinnerMenu', (req, res) => {
    // res.send('In pages')
    res.render('pages/dinner-menu')      // EXMAPLE this will show in the url and the res.render(...) is the fucntion that allows this to happen
})
router.post('/', (req, res) =>{
        const page = new Page({
    })
})

module.exports = router 