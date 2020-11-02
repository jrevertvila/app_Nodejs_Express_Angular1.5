var {merge} = require('lodash');

const QueryResolvers = {
    Query: {
        message: () => 'Hello World!',
        authenticationError: () => {
            throw new AuthenticationError('must authenticate');
        }
    }
}

const BrandResolvers = require('./merch/brand.resolver.js');
const ShoesResolvers = require('./merch/shoes.resolver.js');


const resolvers = merge(
    QueryResolvers,
    BrandResolvers,
    ShoesResolvers

);
module.exports = resolvers;
// export default resolvers;