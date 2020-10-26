var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const { timeStamp } = require('console');
var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  idsocial: String,
  bio: String,
  type: String,
  image: String,
  karma: { type: Number, default: 0 },
  provider: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
  retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  last_session: { type: Date, default: Date.now },
  hash: String,
  salt: String
}, { timestamps: true });

// UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image,
    type: this.type,
    karma: this.karma
  };
};

UserSchema.methods.toProfileJSONFor = function (user) {
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    following: user ? user.isFollowing(this._id) : false
  };
};

UserSchema.methods.favorite = function (id) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites = this.favorites.concat(id);
  }

  return this.save();
};

UserSchema.methods.unfavorite = function (id) {
  this.favorites.remove(id);
  return this.save();
};

UserSchema.methods.isFavorite = function (id) {
  return this.favorites.some(function (favoriteId) {
    return favoriteId.toString() === id.toString();
  });
};

UserSchema.methods.retweet = function (id) {
  if (this.retweets.indexOf(id) === -1) {
    this.retweets = this.retweets.concat(id);
  }

  return this.save();
};

UserSchema.methods.unretweet = function (id) {
  this.retweets.remove(id);
  return this.save();
};

UserSchema.methods.isRetweet = function (id) {
  return this.retweets.some(function (retweetId) {
    return retweetId.toString() === id.toString();
  });
};

UserSchema.methods.follow = function (id) {
  if (this.following.indexOf(id) === -1) {
    this.following = this.following.concat(id);
  }

  return this.save();
};

UserSchema.methods.unfollow = function (id) {
  this.following.remove(id);
  return this.save();
};

UserSchema.methods.isFollowing = function (id) {
  return this.following.some(function (followId) {
    return followId.toString() === id.toString();
  });
};

//KARMA
UserSchema.methods.increaseKarma = function (qty) {
  this.karma = this.karma + qty
  return this.save();
};

UserSchema.methods.decreaseKarma = function (qty) {
  this.karma = this.karma - qty
  if (this.karma < 0) this.karma = 0;
  return this.save();
};


mongoose.model('User', UserSchema);
