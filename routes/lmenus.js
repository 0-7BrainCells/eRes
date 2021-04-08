const express = require('express')
const router = express.Router()
const LunchMenuController = require('../controllers/LunchMenuController')

router.post('/add-lunch-menu-item', LunchMenuController.add_lunch_menu_item) 
router.post('/remove-lunch-menu-item', LunchMenuController.remove_lunch_menu_item) 

module.exports = router