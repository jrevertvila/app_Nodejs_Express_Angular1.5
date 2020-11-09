var {merge} = require('lodash');

const QueryResolvers = {
    Query: {
        message: () => 'Hello World!',
        authenticationError: () => {
            throw new AuthenticationError('must authenticate');
        }
    }
}

const MerchResolvers = require('./merch/merch.resolver.js')
const BrandResolvers = require('./merch/brand.resolver.js');
const ItemResolvers = require('./merch/item.resolver.js')
const CategoryResolvers = require('./merch/category.resolver.js');


const resolvers = merge(
    QueryResolvers,
    MerchResolvers,
    BrandResolvers,
    ItemResolvers,
    CategoryResolvers

);
module.exports = resolvers;
// export default resolvers;