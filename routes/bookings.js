const express = require('express')
const router = express.Router()
const BookingController = require('../controllers/BookingController')

router.post('/booking-received', BookingController.add_booking)

module.exports = router;