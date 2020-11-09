var router = require('express').Router();
const { request } = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var requests = require('./requests.js');


router.get('/', function(req, res, next) {
  User.find().distinct('wishlist').then(function(item){
    return res.json({item: item});
  }).catch(next);
});

router.get('/:username',async function(req, res, next) {
  await User.find({"username":req.params.username}).distinct('wishlist').then(function(item){
    console.log(item);
    let query = `
      query getWishlist{
        wishlist(items:["5fa99642fe606a6b3095c047"]){
          id
          slug
          name
          description
          category {
            id
            slug
            name
          }
          brand {
            id
            slug
            name
          }
          sizes
          colors
          images
        }
      }
    `
    requests.getWishlistUser(query).then((data) => {
      console.log(data.data.wishlist);
    })
    return res.json({item: item});
  }).catch(next);
});


module.exports = router;
