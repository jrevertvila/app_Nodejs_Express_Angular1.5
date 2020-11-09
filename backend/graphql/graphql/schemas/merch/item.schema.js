const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        item(slug: String!): Item
        items: [Item]
        wishlisted: [Item]
    }
    extend type Mutation {
        createItem(input: ItemInput): Item
    }

    type Item {
        id: ID!
        slug: String!
        name: String
        description: String
        category: Category
        brand: Brand
        sizes: [String]
        colors: [String]
        images: [String]
    }
    input ItemInput {
        name: String!
        description: String
        category: String
        brand: String
        sizes: [String]
        colors: [String]
        images: [String]
    }
`;

module.exports = typeDefs;