var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');


router.get('/', function(req, res, next) {
  User.find().distinct('wishlist').then(function(item){
    return res.json({item: item});
  }).catch(next);
});

module.exports = router;
