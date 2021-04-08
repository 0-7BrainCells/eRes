const DinnerMenu = require('../model/DinnerMenu');

exports.add_dinner_menu_item = function (req, res) {
    DinnerMenu.findOne({
      name: req.body.name
    }, function (err, item) {
      if (err) { return res.status(500).send(err); }
  
      if (!item) {
        var myData = new DinnerMenu(req.body);
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

exports.remove_dinner_menu_item = function (req, res) {
  DinnerMenu.deleteOne({
    name: req.body.name
  }, function (err, item) {
    if (err) { return res.status(500).send(err); }

    if (item) {
      var myData = new DinnerMenu(req.body);
      myData.remove()
        .then(item => {
          res.send("Item removed from database");
        })
        .catch(err => {
          res.status(400).send("Unable to remove from database");
        });
    } else {
      return res.status(200).send("Item doesnt exist in database with this name");
    }
  })
}

