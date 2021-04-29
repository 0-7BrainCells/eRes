const Order = require('../model/Order');
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';

exports.cancel_orders = function (req, res, next) {
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      var collection = db.collection("orders");
      collection.deleteMany( {bookingID: req.session.booking.bookingID})
      req.session.booking = null
      req.session.orders = null
      next()
    }
    client.close();
    })
}
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

exports.add_order_lunch = function(req, res) {
  Order.findOne({
      email: req.user.email
    }, function (err, item) {
      if (err) { return res.status(500).send(err); }
        var myData = new Order({bookingID: req.session.booking.bookingID,
                               email: req.user.email, 
                               name: req.body.name,
                               menu: "lunch",  
                               price: req.body.price,
                               quantity: req.body.quantity,
                               isConfirmed: false,
                               sessionID: req.sessionID})
        req.session.orders.push(myData)
        myData.save()
          .then(item => {
            res.redirect('/LunchMenu');
          })
          .catch(err => {
            res.status(400).send("Unable to save to database");
          });
    }
    ) 
}

exports.add_order_dinner = function(req, res) {
    Order.findOne({
        email: req.user.email
      }, function (err, item) {
        if (err) { return res.status(500).send(err); }
          var myData = new Order({bookingID: req.session.booking.bookingID,
                                 email: req.user.email, 
                                 name: req.body.name,
                                 menu: "dinner", 
                                 price: req.body.price,
                                 quantity: req.body.quantity,
                                 isConfirmed: false,
                                 sessionID: req.sessionID})
          req.session.orders.push(myData)
          myData.save()
            .then(item => {
              res.redirect('/DinnerMenu');
            })
            .catch(err => {
              res.status(400).send("Unable to save to database");
            });
      }
      ) 
}

