const express = require('express')
const router = express.Router()
const DinnerMenuController = require('../controllers/DinnerMenuController')

router.post('/add-dmenu-item', DinnerMenuController.add_dmenu_item) 
module.exports = router