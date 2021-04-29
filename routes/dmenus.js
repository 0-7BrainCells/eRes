const express = require('express')
const router = express.Router()
const DinnerMenuController = require('../controllers/DinnerMenuController')
const OrderController = require('../controllers/OrderController')


router.post('/add-dinner-menu-item', DinnerMenuController.add_dinner_menu_item) 
router.post('/remove-dinner-menu-item', DinnerMenuController.remove_dinner_menu_item) 
router.post('/add-order-dinner', OrderController.add_order_dinner)
router.post('/categorise-dinner-menu', DinnerMenuController.display_dinner_menu)

router.get('/DinnerMenu', checkAuthenticated, DinnerMenuController.display_dinner_menu)

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/CustomerLogin')
  }
  
module.exports = router;