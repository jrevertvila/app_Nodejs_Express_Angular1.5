var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var TweetSchema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    body: String,
    favoritesCount: {type: Number, default: 0},
    retweetsCount: {type: Number, default: 0},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

TweetSchema.plugin(uniqueValidator, {message: 'is already taken'});

TweetSchema.pre('validate', function(next){
    if(!this.slug)  {
        this.slugify();
    }

    next();
});

TweetSchema.methods.slugify = function() {
    this.slug = slug(this.author.username) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

TweetSchema.methods.updateFavoriteCount = function() {
    var tweet = this;

    return User.count({favorites: {$in: [tweet._id]}}).then(function(count){
        tweet.favoritesCount = count;

        return tweet.save();
    });
};

TweetSchema.methods.updateRetweetCount = function() {
    var tweet = this;

    return User.count({retweets: {$in: [tweet._id]}}).then(function(count){
        tweet.retweetsCount = count;

        return tweet.save();
    });
};

TweetSchema.methods.toJSONFor = function(user){
    return {
      slug: this.slug,
      body: this.body,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      favorited: user ? user.isFavorite(this._id) : false,
      favoritesCount: this.favoritesCount,
      retweeted: user ? user.isRetweet(this._id) : false,
      retweetsCount: this.retweetsCount,
      author: this.author.toProfileJSONFor(user)
    };
  };
  
  mongoose.model('Tweet', TweetSchema);