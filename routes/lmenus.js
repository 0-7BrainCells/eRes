const express = require('express')
const router = express.Router()
const LunchMenuController = require('../controllers/LunchMenuController')
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';
const collname = 'lunchmenus';

router.post('/add-lunch-menu-item', LunchMenuController.add_lunch_menu_item) 
router.post('/remove-lunch-menu-item', LunchMenuController.remove_lunch_menu_item) 


//This route defines the functionality of when the user goes to the LunchMenu page. It connects to the database, finds all the entries of the collection and then adds them to an array to return. 
//we return this array at the end with res.render(..., {items: resultArray}), meaning render this page 'lunch menu' but also give it a variable items which is the same as resultArray. See the lunch menu view to see how this variable is accessed using EJS

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
            var resultArray = []; //Declare the array which we will populate then return
            items.forEach(function(item){
                resultArray.push(item); //Add items to the array
            });
            res.render('user/lunch-menu', {items: resultArray}); //Render the page and pass the results in the array as variable item
          }
        });
  
        // close db client
        client.close();
      }
    });
  });

module.exports = router