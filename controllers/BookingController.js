const Booking = require('../model/Booking');
const Order = require('../model/Order');

var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';

//Function: adds a booking into the booking database using input fields of user name, table number and date string (DD/MM/YYYY)
//Only allows future dates
 
exports.add_booking = function(req, res) {
  var now = Date.parse(new Date())
  var bookdate = Date.parse(req.body.date)
  if (now > bookdate) { return res.status(400).send("Please select future date (click back to return to previous page)"); }
    Booking.findOne({   
        emnail: req.user.email
      }, function(err, booking) {
        if (err) { return res.status(500).send("Error. Go back."); }
  
        if (!booking) {  
            var myData = new Booking({email: req.user.email,
                                      date: req.body.date,
                                      time: req.body.time,
                                      numGuests: req.body.numGuests});
             myData.save()
                .then(item => {
                  return res.status(200).render('user/booking/booking-confirmation');
             })
             .catch(err => {
                     res.status(400).send("Unable to save to database");
             });  
        } else {  
            return res.status(200).send("You may only have one booking. (Cancel/Edit current booking?)");
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
      collection.find({email: req.user.email}).toArray(function(err, items) {
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
