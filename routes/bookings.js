const express = require('express')
const router = express.Router()
const BookingController = require('../controllers/BookingController')
const OrderController = require('../controllers/OrderController')

router.post('/booking-received', BookingController.add_booking) 

router.post('/update-booking', BookingController.update_booking)

router.get('/CustomerCheckout', checkAuthenticated, BookingController.display_checkout)


function checkAuthenticated(req, res, next) {
if (req.isAuthenticated()) {
    return next()
}
     res.redirect('/CustomerLogin')
}
module.exports = router;