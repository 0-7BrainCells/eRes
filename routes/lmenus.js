const express = require('express')
const router = express.Router()
const LunchMenuController = require('../controllers/LunchMenuController')
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';
const collname = 'lunchmenus';

router.post('/add-lunch-menu-item', LunchMenuController.add_lunch_menu_item) 
router.post('/remove-lunch-menu-item', LunchMenuController.remove_lunch_menu_item) 

//This route handles displaying the menu when directed to the Lunch Menu route, check the function in Lunch Menu Controller for details on how it displays. 
router.get('/LunchMenu', LunchMenuController.display_lunch_menu)

module.exports = router