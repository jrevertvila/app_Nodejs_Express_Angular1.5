var router = require('express').Router();
const { json } = require('body-parser');
const { request } = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var requests = require('./requests.js');


router.get('/', function (req, res, next) {
  User.find().distinct('wishlist').then(function (item) {
    return res.json({ item: item });
  }).catch(next);
});

router.get('/:username', async function (req, res, next) {
  await User.find({ "username": req.params.username }).distinct('wishlist').then(async function (item) {
    let query = `
      query getWishlist{
        wishlist(items:${arrToString(item)}){
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
    return await requests.getWishlistUser(query).then((data) => {
      return res.json({ wishlist: data.data.wishlist });
    })
  }).catch(next);
});

let arrToString = (arr) => {
  let result = "[";
  for (let x = 0; x < arr.length; x++) {
    result += ('"'+arr[x]+'",')
  }
  result = result.slice(0,-1);
  result += ']';
  return result;
}


module.exports = router;
