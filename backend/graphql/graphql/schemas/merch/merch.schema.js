const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Mutation {
        addToWishlist(input: WishlistInput): WishlistResponse
        removeFromWishlist(input: WishlistInput): WishlistResponse
    }

    type WishlistResponse {
        ok: Boolean!
    }

    input WishlistInput {
        id: String!
    }
`;

module.exports = typeDefs;

// export default typeDefs;