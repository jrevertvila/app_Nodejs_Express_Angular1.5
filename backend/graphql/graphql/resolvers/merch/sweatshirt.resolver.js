const mongoose = require('mongoose');
const Sweatshirt = mongoose.model('Sweatshirt');
const Brand = mongoose.model('Brand');

const resolvers = {
  Query: {
    sweatshirt: (root, { slug }) => {
      return Sweatshirt.findOne({ slug: slug }).exec();
    },
    sweatshirts: () => {
      return Sweatshirt.find().exec();
    },
  },

  Mutation: {
    createSweatshirt: (root, { input }) => {
      const sweatshirt = new Sweatshirt(input);
      sweatshirt.save();
      return sweatshirt;
    }
  },
  Sweatshirt: {
    brand: (parent) => {
      return Brand.findOne({ _id: parent.brand }).exec();
    }
  }
};
module.exports = resolvers;
// export default resolvers;