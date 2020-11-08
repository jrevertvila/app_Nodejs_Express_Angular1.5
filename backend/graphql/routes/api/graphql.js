const { ApolloServer } = require('apollo-server-express');
const { AuthenticationError } = require('apollo-server-express');
const typeDefs = require('../../graphql/schemas/schema');
const resolvers = require('../../graphql/resolvers/resolver');
const request = require('./requests.js');
const mongoose = require('mongoose');
// const User = mongoose.model('User');

const SERVER = new ApolloServer({
    typeDefs,
    resolvers
});

const SERVERAUTH = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => { // Asks to Rest BE if Token is OK and Returns User
        let user = null;
        if (req.payload) {
            //GET USER FROM ENDPOINT IN REST  (FOR REMOVE USER'S SCHEMA IN GRAPHQL)
            await request.checkUser(req.headers.authorization).then((res) => user = res);
        }
        return { user, req, AuthenticationError };
    },
});

const SERVERS = {
    graphql: SERVER,
    graphqlauth: SERVERAUTH
};

module.exports = SERVERS;