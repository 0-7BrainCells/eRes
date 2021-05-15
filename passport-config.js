const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./model/User');
const Staff = require('./model/Staff');
const passport = require("passport");

passport.serializeUser((user, done) => {
    let type = user.type;
    done(null, { id: user.id, type: type});
});

passport.deserializeUser((data, done) => {
    if(data.type === 'user') {
        User.findById(data.id, function(err, user) {
          done(err, user);
        });
      } else if (data.type === 'staff') {
        Staff.findById(data.id, function(err, user) {
          done(err, user);
        });
      }
});

const authenticateUser = async (email, password, done) => { 
    // Match User
    User.findOne({ email: email })
        .then(user => {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Wrong email or password." });
                    }
                });
        })
        .catch(err => {
            console.log(err.error);
            return done(null, false, { message: "Wrong email or password." });
        });
}

const authenticateStaff = async (ID, password, done) => { 
    // Match User
    Staff.findOne({ ID: ID })
        .then(user => {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Wrong ID or password." });
                    }
                });
        })
        .catch(err => {
            return done(null, false, { message: "Wrong ID or password." });
        });
}
    
passport.use('user-local', new LocalStrategy({ usernameField: 'email'}, authenticateUser))
passport.use('staff-local', new LocalStrategy({ usernameField: 'ID'}, authenticateStaff))
