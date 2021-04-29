const LunchMenu = require('../model/LunchMenu');
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';
const collname = 'lunchmenus';


//This function gets called when the Lunch Menu page loads, it gets all lunch menu items and stores them in an array for the EJS page to use. 
//This array is sent to the ejs page that it renders (user/lunchmenu) using the variable items, and can be referred to as such within the ejs file. 
exports.display_lunch_menu = function(req, res) {
  var category;
  if (req.body.category) {category = req.body.category;} else {category = "default"}
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
          res.render('user/lunch-menu', {category: category, items: resultArray, booking: req.session.booking, orders : req.session.orders}); //Render the page and pass the results in the array as variable item
        }
      });

      // close db client
      client.close();
    }
  });
}

exports.add_lunch_menu_item = function (req, res) {
    LunchMenu.findOne({
      name: req.body.name
    }, function (err, item) {
      if (err) { return res.status(500).send(err); }
  
      if (!item) {
        var myData = new LunchMenu(req.body);
        myData.save()
          .then(item => {
            res.send("item saved to database");
          })
          .catch(err => {
            res.status(400).send("Unable to save to database");
          });
      } else {
        return res.status(200).send("Item already exists (edit item if you want to change price or desc)");
      }
    }
    ) 
}

exports.remove_lunch_menu_item = function (req, res) {
  LunchMenu.deleteOne({
    name: req.body.name
  }, function (err, item) {
    if (err) { return res.status(500).send(err); }

    if (item) {
      var myData = new LunchMenu(req.body);
      myData.remove()
        .then(item => {
          res.send("Item removed from database");
        })
        .catch(err => {
          res.status(400).send("Unable to remove from database");
        });
    } else {
      return res.status(200).send("Item doesnt exist in database with this name");
    }
  })
}
