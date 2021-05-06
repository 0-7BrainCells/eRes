const Invoice = require('../model/Invoice');

//Function is called when a booking is confirmed. It aggregates the booking information, the orders and the total (discounted) price

exports.add_invoice = function (req, res, next) {
    console.log(req.session.booking.bookingID)
    console.log(req.body.totalPrice)
        var myData = new Invoice({bookingID: req.session.booking.bookingID, 
                                  totalPrice: req.body.totalPrice});
        myData.save()
          .then(item => {
            next();
          })
          .catch(err => {
            res.status(400).send("Unable to save invoice to database");
          });
} 


exports.remove_Invoice = function (req, res) {
  Invoice.deleteOne({
    ID: req.body.ID
  }, function (err, item) {
    if (err) { return res.status(500).send(err); }

    if (item) {
      var myData = new Invoice(req.body);
      myData.remove()
        .then(item => {
          res.send("Item removed from database (if it exists)");
        })
        .catch(err => {
          res.status(400).send("Unable to remove from database");
        });
    } else {
      return res.status(200).send("Item doesnt exist in database with this name");
    }
  })
}

