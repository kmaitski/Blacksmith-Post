const LocalStrategy = require('passport-local').Strategy;

const User = require('../database/index.js').User;

module.exports = passport => {
  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  });
  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    username: "username",
    password: "password",
    passReqToCallback: true
  },
  (req, username, password, cb) => {
    process.nextTick(() => {
      User.findOne({'local.username': username}, (err, user) => {
        if (err) return cb(err);
        if (user) return(null, false, console.log('signupMessage', 'Email already taken'));
        else {
          let newUser = new User();
          newUser.local.username = username;
          newUser.local.password = password;
          newUser.save(err => {
            if (err) console.log('hit err in newuser save', err);
            console.log(newUser);
            return cb(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    username: "username",
    password: "password",
    passReqToCallback: true
  },
  (req, username, password, cb) => {
    process.nextTick(() => {
      User.findOne({'local.username': username}, (err, user) => {
        if (err) return cb(err);
        if (!user) return cb(null, false, console.log('loginMessage', 'no user found'));
        if (user.password !== password) return cb(null, false, console.log('loginMessage', 'passwords do not match'));
        console.log(user);
        return cb(null, user);
      });
    });
  }));
};
