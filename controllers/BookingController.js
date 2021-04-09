var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority";
const Booking = require('../model/Booking');
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
