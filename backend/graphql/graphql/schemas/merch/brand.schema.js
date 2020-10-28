const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        brand(slug: String!): Brand
        brands: [Brand]
    }
    extend type Mutation {
        createBrand(input: BrandInput): Brand
    }
    type Brand {
        id: ID!
        slug: String!
        name: String
        description: String
        web: String
    }
    input BrandInput {
        name: String!
        description: String
        web: String
    }
`;

module.exports = typeDefs;

// export default typeDefs;