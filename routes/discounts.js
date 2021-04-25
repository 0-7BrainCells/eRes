const express = require('express')
const router = express.Router()
const DiscountController = require('../controllers/DiscountController')

router.post('/discount-added', DiscountController.add_discount)

router.post('/discount-removed', DiscountController.remove_discount)

module.exports = router;