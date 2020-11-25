var router = require('express').Router();
var mongoose = require('mongoose');
var Tweet = mongoose.model('Tweet');
var User = mongoose.model('User');
var auth = require('../auth');

//LOAD/IMPORT PROMETHEUS 

let client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const counterTweetsEndpoint = new client.Counter({
  name: 'counterTweetsEndpoint',
  help: 'Total gets tweets of endpoint'
});

const counterTweetDetailsEndpoint = new client.Counter({
  name: 'counterTweetDetailsEndpoint',
  help: 'Total gets tweets of endpoint'
});

// Preload tweet obj
router.param('tweet', function (req, res, next, slug) {
  Tweet.findOne({ slug: slug })
    .populate('author')
    .populate('parent')
    .populate('replies')
    .then(function (tweet) {
      if (!tweet) { return res.sendStatus(404); }

      req.tweet = tweet;

      return next();
    }).catch(next);
});

//RETURN LAST 20 TWEETS
router.get('/', auth.optional, function (req, res, next) {
  counterTweetsEndpoint.inc();
  var query = {};
  var limit = 20;
  var offset = 0;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  Promise.all([
    req.query.author ? User.findOne({ username: req.query.author }) : null,
    req.query.favorited ? User.findOne({ username: req.query.favorited }) : null
  ]).then(function (results) {
    var author = results[0];
    var favoriter = results[1];

    if (author) {
      query.author = author._id;
    }
    query.parent = null; //not show replies
    if (favoriter) {
      query._id = { $in: favoriter.favorites };
    } else if (req.query.favorited) {
      query._id = { $in: [] };
    }

    return Promise.all([
      Tweet.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .populate('author')
        .populate('parent')
        .exec(),
      Tweet.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function (results) {
      var tweets = results[0];
      var tweetsCount = results[1];
      var user = results[2];
      return res.json({
        tweets: tweets.map(function (tweet) {
          return tweet.toJSONFor(user);
          // return tweet
        }),
        tweetsCount: tweetsCount
      });
    });
  }).catch(next);
});

router.get('/feed', auth.required, function (req, res, next) {
  var limit = 20;
  var offset = 0;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  // query.parent = null; //not show replies

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      Tweet.find({ author: { $in: user.following } })
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('author')
        .populate('parent')
        .exec(),
      Tweet.count({ author: { $in: user.following } })
    ]).then(function (results) {
      var tweets = results[0];
      var tweetsCount = results[1];

      return res.json({
        tweets: tweets.map(function (tweet) {
          return tweet.toJSONFor(user);
        }),
        tweetsCount: tweetsCount
      });
    }).catch(next);
  });
});

//----- TWEET OPTIONS CRUD-----

//CREATE NEW TWEET
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var tweet = new Tweet(req.body.tweet);
    tweet.author = user;
    //sustituir slug por tweet.parent (slug del parent)
    Tweet.findOne({ _id: tweet.parent }).then(function (data) {

      if (data) {
        tweet.parent = data;

        return tweet.save().then(function () {
          data.replies = data.replies.concat(tweet._id);

          return data.save().then(function () {
            res.json({ tweet: tweet.toJSONFor(user) });
          });
        });

      } else {
        tweet.parent = null;
        return tweet.save().then(function () {
          return res.json({ tweet: tweet.toJSONFor(user) });
        });
      }
    })
    user.increaseKarma(5);
  }).catch(next);
});

//RETURN ONE TWEET BY SLUG
router.get('/:tweet', auth.optional, function (req, res, next) {
  counterTweetDetailsEndpoint.inc();
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.tweet.populate('author').execPopulate(),
    req.tweet.populate('parent').execPopulate(),
    // req.tweet.populate('replies').execPopulate(),
    req.tweet.populate({
      path: 'replies',
      populate: {
        path: 'author',
        model: 'User'
      }
    }).execPopulate(),


  ]).then(function (results) {
    var user = results[0];

    return res.json({ tweet: req.tweet.toJSONFor(user) });
  }).catch(next);
});

//DELETE TWEET BY SLUG
router.delete('/:tweet', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(async function (user) {
    if (!user) { return res.sendStatus(401); }
    let countTw = 0;
    if (req.tweet.author._id.toString() === req.payload.id.toString()) {
      let arrDelete = [];
      arrDelete = [req.tweet._id];
      console.log(arrDelete);
      for (let x = 0; x < arrDelete.length; x++) {
        let obj = arrDelete[x].slug ? arrDelete[x]._id : arrDelete[x];
        console.log(obj);
        await Tweet.findOne({ _id: obj }).then((data) => {
          console.log("replies: "+data.replies.length);
          if (data.author == req.payload.id.toString()) countTw++;

          if (data.replies.length !== 0) {
            arrDelete = [...arrDelete, ...data.replies];
          }
        })
      }
      arrDelete = arrDelete.reverse();
      console.log(arrDelete);
      if (req.tweet.parent != null) Tweet.findOne({ _id: req.tweet.parent._id }).then((parent) => parent.removeReply(req.tweet._id) );

      Tweet.remove({ _id: { $in: arrDelete } }).then((result) => {
        user.decreaseKarma(5 * (countTw == 0 ? 1 : countTw));
        return res.status(200).send('Deleted correctly');
      }).catch(() => {
        return res.sendStatus(503)
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

//UPDATE TWEET
router.put('/:tweet', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (req.tweet.author._id.toString() === req.payload.id.toString()) {

      if (typeof req.body.tweet.body !== 'undefined') {
        req.tweet.body = req.body.tweet.body;
      }

      req.tweet.save().then(function (tweet) {
        return res.json({ tweet: tweet.toJSONFor(user) });
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
})

//----- TWEET OPTIONS FAVORITES-----

// ADD FAV TO TWEET
router.post('/:tweet/favorite', auth.required, function (req, res, next) {
  var tweetId = req.tweet._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }
    user.increaseKarma(5);
    return user.favorite(tweetId).then(function () {
      return req.tweet.updateFavoriteCount().then(function (tweet) {
        return res.json({ tweet: tweet.toJSONFor(user) });
      });
    });
  }).catch(next);
});

// DELETE FAV TO TWEET
router.delete('/:tweet/favorite', auth.required, function (req, res, next) {
  var tweetId = req.tweet._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }
    user.decreaseKarma(5);
    return user.unfavorite(tweetId).then(function () {
      return req.tweet.updateFavoriteCount().then(function (tweet) {
        return res.json({ tweet: tweet.toJSONFor(user) });
      });
    });
  }).catch(next);
});

//----- TWEET OPTIONS RETWEETS-----

// ADD rt TO TWEET
router.post('/:tweet/retweet', auth.required, function (req, res, next) {
  var tweetId = req.tweet._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return user.retweet(tweetId).then(function () {
      return req.tweet.updateRetweetCount().then(function (tweet) {
        return res.json({ tweet: tweet.toJSONFor(user) });
      });
    });
  }).catch(next);
});

// DELETE rt TO TWEET
router.delete('/:tweet/retweet', auth.required, function (req, res, next) {
  var tweetId = req.tweet._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return user.unretweet(tweetId).then(function () {
      return req.tweet.updateRetweetCount().then(function (tweet) {
        return res.json({ tweet: tweet.toJSONFor(user) });
      });
    });
  }).catch(next);
});

module.exports = router;