var apikeys = require('./apikeys.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
const { GITHUB_CLIENT_ID } = require('./apikeys.js');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));


passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/api/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  console.log(GITHUB_CLIENT_ID);
  console.log(GITHUB_CLIENT_SECRET);
  console.log("GHub strategy");
  console.log(profile);
  // User.findOrCreate({ githubId: profile.id }, function (err, user) {
  //   return done(err, user);
  // });
  // User.findOne({email: email}).then(function(user){
    // if(!user || !user.validPassword(password)){
    //   return done(null, false, {errors: {'email or password': 'is invalid'}});
    // }
    
    // return done(null, user);
  // }).catch(done);
}));

