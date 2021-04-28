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
                                 quantity: req.body.quantity,
                                 sessionID: req.sessionID});
          myData.save()
            .then(item => {
              res.send("Item added to order, please return to a menu.");
            })
            .catch(err => {
              res.status(400).send("Unable to save to database");
            });
      }
      ) 
}

