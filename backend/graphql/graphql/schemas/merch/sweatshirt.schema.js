const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        sweatshirt(slug: String!): Sweatshirt
        sweatshirts: [Sweatshirt]
    }
    extend type Mutation {
        createSweatshirt(input: SweatshirtInput): Sweatshirt
    }
    type Sweatshirt {
        id: ID!
        slug: String!
        name: String
        description: String
        brand: Brand
        sizes: [String]
        colors: [String]
        images: [String]
    }
    input SweatshirtInput {
        name: String!
        description: String
        brand: String
        sizes: [String]
        colors: [String]
        images: [String]
    }
`;

module.exports = typeDefs;
// export default typeDefs;