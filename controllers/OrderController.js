const Order = require('../model/Order');
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';

exports.confirm_orders = function (req, res, next) {
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      var collection = db.collection("orders");
      collection.updateMany( {sessionID: req.sessionID}, {
        $set: {isConfirmed: true
        }
      })
      next()
    }
    client.close();
    })
}

exports.delete_unconfirmed_orders = function (req, res, next) {
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      var collection = db.collection("orders");
      collection.deleteMany( {sessionID: req.sessionID, isConfirmed: false})
      next()
    }
    client.close();
    })
}

exports.add_order = function(req, res) {
    Order.findOne({
        email: req.user.email
      }, function (err, item) {
        if (err) { return res.status(500).send(err); }
          var myData = new Order({bookingID: req.session.bookingID,
                                 email: req.user.email, 
                                 name: req.body.name, 
                                 price: req.body.price,
                                 quantity: req.body.quantity,
                                 isConfirmed: false,
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

