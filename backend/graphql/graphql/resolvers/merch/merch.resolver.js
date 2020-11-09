const mongoose = require('mongoose');
const request = require('../../../routes/api/requests.js');
const auth = require('../../../routes/auth.js');

const resolvers = {
    Query: {

    },

    Mutation: {
        addToWishlist: (root, { input }, req) => {
            console.log(req.req.headers);
            return request.wishlistToUser({wishlist:input.id},req.req.headers.authorization);
        },
        removeFromWishlist: (root, { input }, req) => {
            request.wishlistToUser({wishlist_split:input.id},req.req.headers.authorization);
        }
    }
};
module.exports = resolvers;