const LunchMenu = require('../model/LunchMenu');

exports.add_lmenu_item = function (req, res) {
    LunchMenu.findOne({
      name = req.body.name
    }, function (err, item) {
      if (err) { return res.status(500).send(err); }
  
      if (!item) {
        var myData = new LunchMenu(req.body);
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