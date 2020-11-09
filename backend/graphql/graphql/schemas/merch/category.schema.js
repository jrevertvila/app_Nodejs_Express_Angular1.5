const { gql } = require('apollo-server-express');

const typeDefs = gql`
    extend type Query {
        category(slug: String!): Category
        categories: [Category]
    }
    extend type Mutation {
        createCategory(input: CategoryInput): Category
        deleteCategory(input: deleteCategoryInput) : DeleteResponseC
    }
    type Category {
        id: ID!
        slug: String!
        name: String
        description: String
    }

    type DeleteResponseC {
        ok: Boolean!
    }

    input deleteCategoryInput {
        slug: String!
    }
    
    input CategoryInput {
        name: String!
        description: String
    }
`;

module.exports = typeDefs;