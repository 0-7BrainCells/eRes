const User = require('../model/User');
const Staff = require('../model/Staff');
const bcrypt = require('bcrypt')
var MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority';
const dbname = 'eRes';

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
          zip: req.body.zip,
          type: 'user'
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

    return res.status(200).render('staff/staff-successful', {staffUser : user});
  }
  )
}
//not coded properly yet ;)
exports.staff_register_post = async function (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    Staff.findOne({
      ID: req.body.ID
    }, function (err, user) {
      if (err) { return res.status(500).send(err); }

      if (!user) {
        var myData = new Staff({ID : req.body.ID, 
                                password : hashedPassword, 
                                role : req.body.role,
                                type: 'staff'});
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
  } catch (error) {
    res.redirect('/StaffRegistration')
  }
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

exports.customer_update_account = async function (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      var collection = db.collection("users");
      collection.findOneAndUpdate( {email: req.user.email}, {
        $set: { password: hashedPassword,
                fname: req.body.fname,
                lname: req.body.lname,
                city: req.body.city,
                zip: req.body.zip,
        }
      }).then(res.redirect('/CustomerHomepage'));
    }
    client.close();
    })
  } catch (err) {
    res.redirect('/UpdateCustomer')
  }
}

exports.staff_customer_update_account = async function (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
  MongoClient.connect(dburl, function(err, client) {
    if (!err) {
      const db = client.db(dbname);
      var collection = db.collection("users");
      collection.findOneAndUpdate( {email: req.body.email}, {
        $set: { password: hashedPassword,
                fname: req.body.fname,
                lname: req.body.lname,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
        }
      }).then(res.redirect('/StaffLayout'));
    }
    client.close();
    })
  } catch (err) {
    res.redirect('/EditCustomer')
  }
}

