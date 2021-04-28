const Booking = require('../model/Booking');
const Order = require('../model/Order');

var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';

//This stores the number of seats at each table from 1 - 34.
const seatCount = []
const numTables = 37;
const maxSeats = 150;

//Initialize the seats at each table. 

for (i = 1; i <= numTables; i++) {
  if (i <= 6) { seatCount[i-1] = 6}          //Tables 1-6 seat 6
  else if (i <= 17) { seatCount[i-1] = 2}    //Tables 6-17 seat 2
  else if (i <= 37) { seatCount[i-1] = 4}    //Tables 18-37 seat 4
}

//Get the amount of seats still available on a given date. 

getSeatsLeft = function(date) {
  var resultArray = [];
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      // Get db
      const db = client.db(dbname);

      // Get collection
      var collection = db.collection("bookings");

      // Find all documents in the collection
      collection.find({date: date}).toArray(function(err, items) {
        if (!err) { //Declare the array which we will populate then return
          items.forEach(function(item){
              resultArray.push(item); //Add items to the array
          });
        }
      });
      client.close();
    }
  })
  var count = 0;
  if (!resultArray) {return maxSeats}
  for (i = 0; i < resultArray.length; i++) {
    count += resultArray[i].numGuests
  }
  return (maxSeats - count);
}

//This updates booking form will just update details same way as making a new booking. 
exports.update_booking = function (req, res) {
  console.log(req.body)
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      var collection = db.collection("bookings");
      collection.findOneAndUpdate( {email: req.user.email}, {
        $set: {date: req.body.date,
               time: req.body.time,
               table: (Number)(req.body.table),
               numGuests: (Number)(req.body.numGuests)
        }
      }).then(res.render('user/booking/booking-confirmation'));
    }
    client.close();
    })
}

exports.confirm_booking = function (req, res) {
  console.log(req.body)
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      var collection = db.collection("bookings");
      collection.findOneAndUpdate( {email: req.user.email}, {
        $set: {isConfirmed: true
        }
      })
    }
    client.close();
    })
}

exports.delete_unconfirmed_booking = function (req, res, next) {
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      var collection = db.collection("bookings");
      collection.deleteOne( {email: req.user.email, isConfirmed: false})
      next()
    }
    client.close();
    })
}

exports.add_booking = function(req, res) {
  var now = Date.parse(new Date())
  var bookdate = Date.parse(req.body.date)

  //Error handling
  if (now > bookdate)                                   { return res.status(400).send("Please select future date (click back to return to previous page)"); }
  if (seatCount[req.body.table-1] < req.body.numGuests) { return res.status(400).send("Table " + req.body.table + " can only seat " + seatCount[req.body.table-1] + " people."); }
  if (getSeatsLeft(req.body.date) < req.body.numGuests) { return res.status(400).send("We only have " + getSeatsLeft(req.body.date) + " seats left on this day.");}
    
  Booking.findOne({   
        email: req.user.email
      }, function(err, booking) {
        if (err) { return res.status(500).send("Error. Go back."); }
  
        if (!booking) {  
            var myData = new Booking({email: req.user.email,
                                      date: req.body.date,
                                      time: req.body.time,
                                      table: req.body.table,
                                      numGuests: req.body.numGuests,
                                      isConfirmed: false, 
                                      hasExpired: false,
                                      sessionID: req.sessionID});
             myData.save()
                .then(item => {
                  return res.status(200).render('user/booking/booking-confirmation');
             })
             .catch(err => {
                     res.status(400).send("Unable to save to database");
             });  
        } else {  
            return res.render('user/booking/update-booking');
        }
      }
    )
}

exports.display_checkout = function(req, res) {
  var bookingArray = [];
  var ordersArray = [];
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      var collection = db.collection("bookings");

      // Find all documents in the collection
      collection.find({email: req.user.email}).toArray(function(err, items) {
        if (!err) { //Declare the array which we will populate then return
          items.forEach(function(item){
              bookingArray.push(item); //Add items to the array
          });
        }
      });
      // Get collection
      collection = db.collection("orders");

      // Find all documents in the collection
      collection.find({email: req.user.email, sessionID: req.sessionID}).toArray(function(err, items) {
        if (!err) { //Declare the array which we will populate then return
          items.forEach(function(item){
              ordersArray.push(item); //Add items to the array
          });
          res.render('user/total-checkout', {user: req.user, orders: ordersArray, booking: bookingArray}) //Render the page and pass the results in the array as variable item
        }
      });

      // close db client
      client.close();
    }
  })
}
