const DinnerMenu = require('../model/DinnerMenu');
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';
const collname = 'dinnermenus';

exports.display_dinner_menu = function (req, res) {
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
          res.render('user/dinner-menu', {items: resultArray, booking: req.session.booking, orders : req.session.orders});
        }
      });

      // close db client
      client.close();
    }
  });
}

exports.add_dinner_menu_item = function (req, res) {
    DinnerMenu.findOne({
      name: req.body.name
    }, function (err, item) {
      if (err) { return res.status(500).send(err); }
  
      if (!item) {
        var myData = new DinnerMenu(req.body);
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

exports.remove_dinner_menu_item = function (req, res) {
  DinnerMenu.deleteOne({
    name: req.body.name
  }, function (err, item) {
    if (err) { return res.status(500).send(err); }

    if (item) {
      var myData = new DinnerMenu(req.body);
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

