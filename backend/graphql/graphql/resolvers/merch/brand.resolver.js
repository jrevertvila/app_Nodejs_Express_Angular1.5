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
          brand.save();
          return brand;
      },
      deleteBrand: (root, {input}) => {
        const ok = Boolean(input.slug)
        Brand.remove({"slug":input.slug}).exec();
        return {ok:ok};
    }
  },
};
module.exports = resolvers;
// export default resolvers;