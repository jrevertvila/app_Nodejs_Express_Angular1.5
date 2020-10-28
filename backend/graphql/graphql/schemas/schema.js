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

var sweatshirt = require('./merch/sweatshirt.schema.js');
var shoes = require('./merch/shoes.schema.js');
var brand = require('./merch/brand.schema.js');

const typeDefs = [
    Query,
    sweatshirt,
    shoes,
    brand
];
module.exports = typeDefs;
// export default typeDefs;