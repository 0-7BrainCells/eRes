const Discount = require('../model/Discount');

exports.add_discount = function (req, res) {
    Discount.findOne({
      ID: req.body.ID
    }, function (err, item) {
      if (err) { return res.status(500).send(err); }
  
      if (!item) {
        var myData = new Discount(req.body);
        myData.save()
          .then(item => {
            res.send("item saved to database");
          })
          .catch(err => {
            res.status(400).send("Unable to save to database");
          });
      } else {
        return res.status(200).send("Item already exists (edit item if you want to change price or desc)");
      }
    }
    ) 
}

exports.remove_discount = function (req, res) {
  Discount.deleteOne({
    ID: req.body.ID
  }, function (err, item) {
    if (err) { return res.status(500).send(err); }

    if (item) {
      var myData = new Discount(req.body);
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

