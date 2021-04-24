const express = require('express')
const router = express.Router()
const LunchMenuController = require('../controllers/LunchMenuController')
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';
const collname = 'lunchmenus';

router.post('/add-lunch-menu-item', LunchMenuController.add_lunch_menu_item) 
router.post('/remove-lunch-menu-item', LunchMenuController.remove_lunch_menu_item) 


router.get('/LunchMenu', function(req, res) {
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
            res.render('user/lunch-menu', {items: resultArray});
          }
        });
  
        // close db client
        client.close();
      }
    });
  });

module.exports = router