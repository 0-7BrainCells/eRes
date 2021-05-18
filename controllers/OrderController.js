const Order = require('../model/Order');
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';


// Deletes all orders associated with a users email. 

exports.cancel_orders = function (req, res, next) {
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      var collection = db.collection("orders");
      collection.deleteMany( {email: req.user.email})
      req.session.booking = null
      req.session.orders = null
      next()
    }
    client.close();
    })
}

// Will set all orders made within a session to isConfirmed true

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

// Will delete all orders for a certain user only if they are not confirmed, called upon logout  

exports.delete_unconfirmed_orders = function (req, res, next) {
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      var collection = db.collection("orders");
      collection.deleteMany( {email: req.user.email, isConfirmed: false})
      next()
    }
    client.close();
    })
}

exports.initialize_orders = function (req, res, next) {
  var resultArray = [];
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      const collection = db.collection("orders");
      var linkedBooking;
      if (req.session.booking) {
        linkedBooking = req.session.booking.bookingID;
      } else {
        linkedBooking = null;
      }
      collection.find({bookingID: linkedBooking}).toArray(function(err, items) {
        if (!err) {
          items.forEach(function(item) {
              resultArray.push(item); 
          })
          req.session.orders = resultArray;
          next();
        }
      });

    }
    client.close();
  });
}

// Adds an order to db linking it to the booking made during that session, and user details. 

exports.add_order_lunch = function(req, res) {
  Order.findOne({
      email: req.user.email
    }, function (err, item) {
      if (err) { return res.status(500).send(err); }
        var myData = new Order({bookingID: req.session.booking.bookingID,
                               email: req.user.email, 
                               name: req.body.name,
                               menu: "Lunch",  
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

//Send all confirmed bookings and all confirmed orders. Use EJS to match orders with bookings to extract date/table number. 
exports.list_all_orders = function (req, res) {
  var ordersArray = []
  var bookingsArray = []
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      var collection = db.collection("bookings");
      collection.find({hasExpired: false, isConfirmed: true}).toArray(function(err, items) {
        if (!err) { 
          items.forEach(function(item){
              bookingsArray.push(item);
              bookingsArray = bookingsArray.sort((a, b)=> a.date - b.date)
          });
        }
      });
      collection = db.collection("orders");
        collection.find({isConfirmed: true}).toArray(function(err, items) {
          if (!err) { 
            items.forEach(function(item){
                ordersArray.push(item); 
            });
            res.render("staff/view-orders", {orders : ordersArray, bookings: bookingsArray})
          }
        });
    }
    client.close()
  })
}

exports.add_order_dinner = function(req, res) {
    Order.findOne({
        email: req.user.email
      }, function (err, item) {
        if (err) { return res.status(500).send(err); }
          var myData = new Order({bookingID: req.session.booking.bookingID,
                                 email: req.user.email, 
                                 name: req.body.name,
                                 menu: "Dinner", 
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

