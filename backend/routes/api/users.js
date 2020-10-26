var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');
var Tweet = mongoose.model('Tweet');

router.get('/user', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

router.put('/user', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    // only update fields that were actually passed...
    if (typeof req.body.user.username !== 'undefined') {
      user.username = req.body.user.username;
    }
    if (typeof req.body.user.email !== 'undefined') {
      user.email = req.body.user.email;
    }
    if (typeof req.body.user.bio !== 'undefined') {
      user.bio = req.body.user.bio;
    }
    if (typeof req.body.user.image !== 'undefined') {
      user.image = req.body.user.image;
    }
    if (typeof req.body.user.password !== 'undefined') {
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function () {
      return res.json({ user: user.toAuthJSON() });
    });
  }).catch(next);
});

//DELETE USER AND TWEETS / RELEASES;

router.delete('/user/:user', auth.required, async function (req, res, next) {
  await User.findById(req.payload.id).then(async function (user) {
    if (!user) { return res.sendStatus(401); }
    if (user.username == req.params.user || user.type == "admin") {
      let user_tweets; //EVERY TWEET OF USER
      await Tweet.find({ author: user._id }).select('_id').then((data) => user_tweets = data);
      let arrDelete = user_tweets.map((x) => { return x._id + "" });

      for (let x = 0; x < arrDelete.length; x++) {
        console.log(x + "=================");
        let obj = arrDelete[x].slug ? arrDelete[x]._id : arrDelete[x];

        await Tweet.findOne({ _id: obj }).then((data) => {
          // console.log(data);
          if (data.replies.length !== 0) {
            data.replies.map((reply) => {
              if (!arrDelete.includes(reply + "")) arrDelete.push(reply + "")
            });
          }
        })
      }

      try {
        await Tweet.remove({ _id: { $in: arrDelete } });

        await User.remove({ _id: user._id }).then((result) => {
          return res.status(200).send('Deleted ' + user.username + ' and tweets correctly');
        }).catch(() => {
          return res.sendStatus(503);
        });

      } catch (e) {
        return res.sendStatus(503);
      }

    } else {
      return res.sendStatus(401);
    }

  }).catch(next);
});

router.post('/users/login', function (req, res, next) {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users', function (req, res, next) {
  var user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.provider = "local";

  User.find({ $and: [{ 'email': user.email }, { 'provider': "local" }] },
    function (err, user) {
      if (!err) {
        console.log("no error");
        console.log(user);
      } else {
        console.log("error");
        console.log(err);
      }
    });




  if (req.body.user.type) {
    user.type = req.body.user.type;
  } else {
    user.type = "client"
  }

  user.setPassword(req.body.user.password);

  user.save().then(function () {
    return res.json({ user: user.toAuthJSON() });
  }).catch(next);

});

router.post("/users/sociallogin", function (req, res, next) {
  let memorystore = req.sessionStore;
  let sessions = memorystore.sessions;
  let sessionUser;
  for (var key in sessions) {
    sessionUser = JSON.parse(sessions[key]).passport.user;
  }

  User.find({ _id: sessionUser }, function (err, user) {
    user = user[0];

    if (err) return done(err);
    // if the user is found then log them in
    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() }); // user found, return that user
    } else {
      return res.status(422).json(err);
    }
  });
});

//GITHUB AUTH

router.get("/auth/github", passport.authenticate("github"));

router.get('/auth/github/callback',
  passport.authenticate("github", {
    successRedirect: "http://localhost:4000/#!/auth/sociallogin",
    failureRedirect: "/"
  })
);

//GOOGLE AUTH

router.get('/auth/google',
  passport.authenticate('google', {
    scope:
      ['https://www.googleapis.com/auth/plus.login',
        , 'https://www.googleapis.com/auth/plus.profile.emails.read'
        , 'https://www.googleapis.com/auth/userinfo.email']
  }
  ));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:4000/#!/auth/sociallogin',
    failureRedirect: '/'
  }));

module.exports = router;
