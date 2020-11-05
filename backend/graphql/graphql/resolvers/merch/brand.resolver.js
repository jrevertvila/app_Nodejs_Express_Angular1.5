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
      },
      deleteBrand: (root, {slug}) => {
        console.log(slug);
        const status = Boolean(slug)
        Brand.remove({"slug":slug}).exec();
        return status;
    }
  },
};
module.exports = resolvers;
// export default resolvers;