var apikeys = require('./apikeys.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var mongoose = require('mongoose');
const { GITHUB_CLIENT_ID } = require('./apikeys.js');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function (email, password, done) {
              
  User.findOne({ $and:[ {'email':email}, {'provider':"local"} ]}).then(function (user) {
    if (!user || !user.validPassword(password)) {
      return done(null, false, { errors: { 'email or password': 'is invalid' } });
    }

    return done(null, user);
  }).catch(done);
}));

passport.serializeUser(function (user, done) {
  console.log("serializeUSER");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("deserializeUSER");
  console.log(id);

  User.findById(id)
    .then(user => {
      console.log(user);
      done(null, user);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });

});


passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/github/callback"
},
  function (accessToken, refreshToken, profile, done) {

    console.log("GHub strategy");
    console.log(profile);

    User.findOne({ idsocial: profile.id.toString() }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (user) {
        console.log("created");
        return done(null, user);
      } else {

        var user = new User({
          idsocial: profile.id,
          username: profile.username + '_' + (Math.random() * Math.pow(36, 6) | 0).toString(36),
          email: profile.username.toLowerCase() + "@gmail.com",
          image: profile.photos[0].value,
          type: "client",
          provider: "github"
        });
        user.save(function (err) {
          // if (err) {
          console.log(err);
          return done(null, user);
          // }
        });
      }
    });
  }
));

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOne({ idsocial: profile.id.toString() }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (user) {
        console.log("created");
        return done(null, user);
      } else {
        var user = new User({
          idsocial: profile.id,
          username: profile.email.split("@")[0].toString(36).replace(/\./g, '_') + '_' + (Math.random() * Math.pow(36, 6) | 0),
          email: profile.email,
          image: profile.photos[0].value,
          type: "client",
          provider: "google"
        });
        user.save(function (err) {
          // if (err) {
          console.log(err);
          return done(null, user);
          // }
        });
      }
    });
  }
));



