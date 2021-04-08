const express = require('express')
const router = express.Router()
const LunchMenuController = require('../controllers/LunchMenuController')

router.post('/add-lunch-menu-item', LunchMenuController.add_lunch_menu_item) 
router.post('/remove-lunch-menu-item', LunchMenuController.remove_lunch_menu_item) 


//router.get('/list-lunch-menu-items', LunchMenuController.list_lunch_menu_items) 

module.exports = router