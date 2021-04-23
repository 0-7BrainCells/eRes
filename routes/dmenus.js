const express = require('express')
const router = express.Router()
const DinnerMenuController = require('../controllers/DinnerMenuController')
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';
const collname = 'dinnermenus';

router.post('/add-dinner-menu-item', DinnerMenuController.add_dinner_menu_item) 
router.post('/remove-dinner-menu-item', DinnerMenuController.remove_dinner_menu_item) 

//Check lmenu route page for exact same function description as this one

router.get('/DinnerMenu', function(req, res) {
    // connect to DB
    MongoClient.connect(dburl, function(err, client) {
      if (!err) {
  
        // Get db
        const db = client.db(dbname);
  
        // Get collection
        const collection = db.collection(collname);
  
        // Find all documents in the collection
        collection.find({}).toArray(function(err, items) {
          if (!err) {
  
            // write HTML output
            var resultArray = [];
            items.forEach(function(item){
                resultArray.push(item);
            });
            res.render('user/dinner-menu', {items: resultArray});
          }
        });
  
        // close db client
        client.close();
      }
    });
  });

module.exports = router;