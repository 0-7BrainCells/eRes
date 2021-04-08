const express = require('express')
const router = express.Router()
const LunchMenuController = require('../controllers/LunchMenuController')

router.post('/add-lmenu-item', LunchMenuController.add_lmenu_item) 

module.exports = router