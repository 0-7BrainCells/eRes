const Booking = require('../model/Booking');
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';
const collname = 'bookings';

//Function: adds a booking into the booking database using input fields of user name, table number and date string (DD/MM/YYYY)
//Only allows future dates
 
exports.add_booking = function(req, res) {
  var now = Date.parse(new Date())
  var bookdate = Date.parse(req.body.date)
  if (now > bookdate) { return res.status(400).send("Please select future date (click back to return to previous page)"); }
    Booking.findOne({   
        fname: req.body.fname,
        lname: req.body.lname,
        date: req.body.date
      }, function(err, booking) {
        if (err) { return res.status(500).send(err); }
  
        if (!booking) {  
            var myData = new Booking(req.body);
             myData.save()
                .then(item => {
                  return res.status(200).render('user/booking/booking-confirmation');
             })
             .catch(err => {
                     res.status(400).send("Unable to save to database");
             });  
        } else {  
            return res.status(200).send("Duplicate booking (same user same date");
        }
      }
    )
}

exports.display_booking = function(req, res) {
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {

      // Get db
      const db = client.db(dbname);

      // Get collection
      const collection = db.collection(collname);

      // Find all documents in the collection
      collection.find({fname: req.user.fname, lname: req.user.lname}).toArray(function(err, items) {
        if (!err) {
          var resultArray = []; //Declare the array which we will populate then return
          items.forEach(function(item){
              resultArray.push(item); //Add items to the array
          });
          res.render('user/total-checkout', {booking: resultArray, user: req.user}); //Render the page and pass the results in the array as variable item
        }
      });

      // close db client
      client.close();
    }
  });
}
