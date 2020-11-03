const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        shoes(slug: String!): Shoes
        shoeses: [Shoes]
    }
    extend type Mutation {
        createShoes(input: ShoesInput): Shoes
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
    input ShoesInput {
        name: String!
        description: String
        brand: String
        sizes: [Int]
        colors: [String]
        images: [String]
    }
`;

module.exports = typeDefs;

// export default typeDefs;