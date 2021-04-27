const express = require('express')
const router = express.Router()
const LunchMenuController = require('../controllers/LunchMenuController')


router.post('/add-lunch-menu-item', LunchMenuController.add_lunch_menu_item) 
router.post('/remove-lunch-menu-item', LunchMenuController.remove_lunch_menu_item) 

//This route handles displaying the menu when directed to the Lunch Menu route, check the function in Lunch Menu Controller for details on how it displays. 
router.get('/LunchMenu', checkAuthenticated, LunchMenuController.display_lunch_menu)

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
        res.redirect('/CustomerLogin')
}
  

module.exports = router