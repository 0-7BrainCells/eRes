const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./model/User');
const passport = require("passport");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

const authenticateUser = async (email, password, done) => { 
    // Match User
    User.findOne({ email: email })
        .then(user => {
            // Create new User
            if (!user) {
                const newUser = new User({ email, password });
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                return done(null, user);
                            })
                            .catch(err => {
                                return done(null, false, { message: "Email does not exist" });
                            });
                    });
                });
                // Return other user
            } else {
                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Wrong password" });
                    }
                });
            }
        })
        .catch(err => {
            return done(null, false, { message: "Email doesnt exist" });
        });
}
    
passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
