const mongoose = require('mongoose');
const Brand = mongoose.model('Brand');

const resolvers = {
    Query: {
      brand: (root, {slug}) => {
        return Brand.findOne({slug: slug}).exec();
      },
      brands: () => {
        return Brand.find().exec();
      },
    },

    Mutation: {
      createBrand: (root, {input}) => {
          const brand = new Brand(input);
  
          // no .exec();
          brand.save();
          return brand;
      }
  },
};
module.exports = resolvers;
// export default resolvers;