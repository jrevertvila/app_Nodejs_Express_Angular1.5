var router = require('express').Router();
var mongoose = require('mongoose');
var Tweet = mongoose.model('Tweet');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload tweet obj
router.param('tweet', function(req, res, next, slug) {
    Tweet.findOne({ slug: slug})
      .populate('author')
      .then(function (tweet) {
        if (!tweet) { return res.sendStatus(404); }
  
        req.tweet = tweet;
  
        return next();
      }).catch(next);
});

//RETURN LAST 20 TWEETS
router.get('/', auth.optional, function(req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  Promise.all([
    req.query.author ? User.findOne({username: req.query.author}) : null,
    req.query.favorited ? User.findOne({username: req.query.favorited}) : null
  ]).then(function(results){
    var author = results[0];
    var favoriter = results[1];

    if(author){
      query.author = author._id;
    }

    if(favoriter){
      query._id = {$in: favoriter.favorites};
    } else if(req.query.favorited){
      query._id = {$in: []};
    }

    return Promise.all([
      Tweet.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Tweet.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var tweets = results[0];
      var tweetsCount = results[1];
      var user = results[2];

      return res.json({
        tweets: tweets.map(function(tweet){
          return tweet.toJSONFor(user);
        }),
        tweetsCount: tweetsCount
      });
    });
  }).catch(next);
});

//----- TWEET OPTIONS CRUD-----

//CREATE NEW TWEET
router.post('/', auth.required, function(req, res, next) {
    User.findById(req.payload.id).then(function(user){
        if (!user) { return res.sendStatus(401); }
    
        var tweet = new Tweet(req.body.tweet);
    
        tweet.author = user;
    
        return tweet.save().then(function(){
            console.log(tweet.author);
            return res.json({tweet: tweet.toJSONFor(user)});
        });
    }).catch(next);
});

//RETURN ONE TWEET BY SLUG
router.get('/:tweet', auth.optional, function(req, res, next) {
    Promise.all([
        req.payload ? User.findById(req.payload.id) : null,
        req.tweet.populate('author').execPopulate()
    ]).then(function(results){
        var user = results[0];
    
        return res.json({tweet: req.tweet.toJSONFor(user)});
    }).catch(next);
});

//DELETE TWEET BY SLUG
router.delete('/:tweet', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.tweet.author._id.toString() === req.payload.id.toString()){
      return req.tweet.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

//UPDATE TWEET
router.put('/:tweet', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.tweet.author._id.toString() === req.payload.id.toString()){

      if(typeof req.body.tweet.body !== 'undefined'){
        req.tweet.body = req.body.tweet.body;
      }

      req.tweet.save().then(function(tweet){
        return res.json({tweet: tweet.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
})

//----- TWEET OPTIONS FAVORITES-----

// ADD FAV TO TWEET
router.post('/:tweet/favorite', auth.required, function(req, res, next) {
  var tweetId = req.tweet._id;

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.favorite(tweetId).then(function(){
      return req.tweet.updateFavoriteCount().then(function(tweet){
        return res.json({tweet: tweet.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// DELETE FAV TO TWEET
router.delete('/:tweet/favorite', auth.required, function(req, res, next) {
  var tweetId = req.tweet._id;

  User.findById(req.payload.id).then(function (user){
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(tweetId).then(function(){
      return req.tweet.updateFavoriteCount().then(function(tweet){
        return res.json({tweet: tweet.toJSONFor(user)});
      });
    });
  }).catch(next);
});

//----- TWEET OPTIONS RETWEETS-----

// ADD FAV TO TWEET
router.post('/:tweet/retweet', auth.required, function(req, res, next) {
  var tweetId = req.tweet._id;

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.retweet(tweetId).then(function(){
      return req.tweet.updateRetweetCount().then(function(tweet){
        return res.json({tweet: tweet.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// DELETE FAV TO TWEET
router.delete('/:tweet/retweet', auth.required, function(req, res, next) {
  var tweetId = req.tweet._id;

  User.findById(req.payload.id).then(function (user){
    if (!user) { return res.sendStatus(401); }

    return user.unretweet(tweetId).then(function(){
      return req.tweet.updateRetweetCount().then(function(tweet){
        return res.json({tweet: tweet.toJSONFor(user)});
      });
    });
  }).catch(next);
});

module.exports = router;