const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        shoes(slug: String!): Shoes
        shoeses: [Shoes]
    }
    type Shoes {
        id: ID!
        slug: String!
        name: String
        description: String
        brand: Brand
        sizes: [Int]
        colors: [String]
        images: [String]
    }
`;

module.exports = typeDefs;

// export default typeDefs;