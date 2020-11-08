// var gql = require('apollo-server-express');
const { gql } = require('apollo-server-express');

const Query = gql`
    scalar Date
    type Query {
        message: String
        authenticationError: String
    }
    type Mutation {
        _empty: String
    }
`;

const merch = require('./merch/merch.schema.js');
const sweatshirt = require('./merch/sweatshirt.schema.js');
const shoes = require('./merch/shoes.schema.js');
const brand = require('./merch/brand.schema.js');

const typeDefs = [
    Query,
    merch,
    sweatshirt,
    shoes,
    brand
];
module.exports = typeDefs;
// export default typeDefs;