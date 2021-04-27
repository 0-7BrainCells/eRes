const express = require('express')
const router = express.Router()
const BookingController = require('../controllers/BookingController')

router.post('/booking-received', BookingController.add_booking) 

router.get('/CustomerCheckout', checkAuthenticated, BookingController.display_booking)

function checkAuthenticated(req, res, next) {
if (req.isAuthenticated()) {
    return next()
}
     res.redirect('/CustomerLogin')
}
module.exports = router;