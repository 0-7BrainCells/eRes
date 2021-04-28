const express = require('express')
const router = express.Router()
const BookingController = require('../controllers/BookingController')
const OrderController = require('../controllers/OrderController')
const DiscountController = require('../controllers/DiscountController')

router.post('/booking-received', BookingController.add_booking) 

router.post('/update-booking', BookingController.update_booking)

router.get('/CustomerCheckout', checkAuthenticated, BookingController.display_checkout)

router.post('/confirm-booking', BookingController.confirm_booking, OrderController.confirm_orders, DiscountController.apply_discount)

function checkAuthenticated(req, res, next) {
if (req.isAuthenticated()) {
    return next()
}
     res.redirect('/CustomerLogin')
}
module.exports = router;