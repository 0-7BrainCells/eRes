const Order = require('../model/Order');
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';
const collname = 'orders';

//Function: adds a booking into the booking database using input fields of user name, table number and date string (DD/MM/YYYY)
//Only allows future dates
 
exports.add_order = function(req, res) {
    Order.findOne({
        email: req.user.email
      }, function (err, item) {
        if (err) { return res.status(500).send(err); }
          var myData = new Order({email: req.user.email, 
                                 name: req.body.name, 
                                 price: req.body.price,
                                 quantity: req.body.quantity});
          myData.save()
            .then(item => {
              res.redirect("/LunchMenu");
            })
            .catch(err => {
              res.status(400).send("Unable to save to database");
            });
      }
      ) 
}

exports.display_order= function(req, res) {
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection(collname);

      // Find all documents in the collection
      collection.find({email: req.user.email}).toArray(function(err, items) {
        if (!err) {
          var resultArray = []; //Declare the array which we will populate then return
          items.forEach(function(item){
              resultArray.push(item); //Add items to the array
          });
          res.render('user/total-checkout', {order: resultArray, user: req.user}); //Render the page and pass the results in the array as variable item
        }
      });

      // close db client
      client.close();
    }
  });
}
