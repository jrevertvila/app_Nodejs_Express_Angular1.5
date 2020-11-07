const {ApolloServer} = require('apollo-server-express');
const {AuthenticationError} = require('apollo-server-express');
const typeDefs = require('../../graphql/schemas/schema');
const resolvers = require('../../graphql/resolvers/resolver');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const SERVER = new ApolloServer({
    typeDefs,
    resolvers
});

const SERVERAUTH = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let user = null;
        if (req.payload) {
            console.log(req.payload);
            user = await User.findById(req.payload.id);
        }
        return { user, AuthenticationError };
    },
});

const SERVERS = {
    graphql: SERVER,
    graphqlauth: SERVERAUTH
};

// export default SERVERS;
module.exports = SERVERS;