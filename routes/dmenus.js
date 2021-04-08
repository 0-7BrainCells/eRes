const express = require('express')
const router = express.Router()
const DinnerMenuController = require('../controllers/DinnerMenuController')

router.post('/add-dinner-menu-item', DinnerMenuController.add_dinner_menu_item) 
router.post('/remove-dinner-menu-item', DinnerMenuController.remove_dinner_menu_item) 

module.exports = router;