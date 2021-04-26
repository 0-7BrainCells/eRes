const express = require('express')
const router = express.Router()
const DinnerMenuController = require('../controllers/DinnerMenuController')


router.post('/add-dinner-menu-item', DinnerMenuController.add_dinner_menu_item) 
router.post('/remove-dinner-menu-item', DinnerMenuController.remove_dinner_menu_item) 

router.get('/DinnerMenu', checkAuthenticated, DinnerMenuController.display_dinner_menu)

function checkAuthenticated(req, res, next) {
    console.log("hi")
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/CustomerLogin')
  }
  
module.exports = router;