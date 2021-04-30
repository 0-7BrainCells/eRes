const User = require('../model/User');
const Staff = require('../model/Staff');
const bcrypt = require('bcrypt')

//This page contains all the business logic functions for user page routes. (login, register etc)


//Function: takes user input and directs to successful login page if a valid login against db, try again if fail. 

exports.customer_login_post = function (req, res) {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, function (err, user) {
    if (err) { return res.status(500).send(err); }

    if (!user) { return res.status(200).render('user/customer-unsuccessful'); }

    return res.status(200).render('user/customer-successful');
  }
  )
}

//Function: takes user input and adds user to db if successful registration. Goes back if user already exists. 
exports.customer_register_post = async function (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) { return res.status(500).send(err); }

      if (!user) {
        var myData = new User({
          email: req.body.email,
          password: hashedPassword,
          fname: req.body.fname,
          lname: req.body.lname,
          city: req.body.city,
          zip: req.body.zip
        });
        myData.save()
          .then(item => {
            res.send("User saved to database (TODO: direct to login page");
          })
          .catch(err => {
            res.status(400).send("Unable to save to database");
          });
      } else {
        return res.status(200).send("Email already exists (TODO: redirect this page to the registration again");
      }
    }
    )
  } catch {
    res.redirect('/CustomerRegistration')
  }
}

//Function: takes staff input and logs into staff portal if staff is in db. 

exports.staff_login_post = function (req, res) {
  Staff.findOne({
    ID: req.body.ID,
    password: req.body.password
  }, function (err, user) {
    if (err) { return res.status(500).send(err); }

    if (!user) { return res.status(200).send("User not found, check username and password are correct"); } //The email or password dont exist in the DB

    // return res.status(200).send("You are logged in succesfully. (TODO: actually make some sort of session thing with profiles");
    return res.status(200).render('staff/staff-successful');
  }
  )
}
//not coded properly yet ;)
exports.staff_register_post = function (req, res) {
  Staff.findOne({
    ID: req.body.ID
  }, function (err, user) {
    if (err) { return res.status(500).send(err); }

    if (!user) {
      var myData = new Staff(req.body);
      myData.save()
        .then(item => {
          res.send("Staff saved to database (TODO: direct to login page");
        })
        .catch(err => {
          res.status(400).send("Unable to save to database");
        });
    } else {
      return res.status(200).send("ID already exists (TODO: redirect this page to the registration again");
    }
  }
  )
}

exports.staff_remove_account = function (req, res) {
  Staff.deleteOne({
    ID: req.body.ID
  }, function (err, user) {
    if (err) { return res.status(500).send(err); }

    if (user) {
      var myData = new Staff(req.body);
      myData.remove()
        .then(item => {
          res.send("Staff removed from database (TODO: direct to login page");
        })
        .catch(err => {
          res.status(400).send("Unable to save to database");
        });
    } else {
      return res.status(200).send("ID does not exist (TODO: redirect this page to the registration again");
    }
  })
}

exports.customer_remove_account = function (req, res) {
  User.deleteOne({
    email: req.body.email
  }, function (err, user) {
    if (err) { return res.status(500).send(err); }

    if (user) {
      var myData = new User(req.body);
      myData.remove()
        .then(item => {
          res.send("User removed from database (TODO: direct to login page");
        })
        .catch(err => {
          res.status(400).send("Unable to save to database");
        });
    } else {
      return res.status(200).send("Email already exist (TODO: redirect this page to the registration again");
    }
  })
}

exports.customer_update_account = function (req, res) {
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      var collection = db.collection("users");
      collection.findOneAndUpdate( {email: req.user.email}, {
        $set: { email: req.body.email,
                password: hashedPassword,
                fname: req.body.fname,
                lname: req.body.lname,
                city: req.body.city,
                zip: req.body.zip
        }
      }).then(res.render('user/customer-settings'));
    }
    client.close();
    })
}

