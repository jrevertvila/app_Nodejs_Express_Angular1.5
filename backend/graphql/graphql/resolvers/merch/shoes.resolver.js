const mongoose = require('mongoose');
const Shoes = mongoose.model('Shoes');
const Brand = mongoose.model('Brand');

const resolvers = {
  Query: {
    shoes: (root, { slug }) => {
      return Shoes.findOne({ slug: slug }).exec();
    },
    shoeses: () => {
      return Shoes.find().exec();
    },
  },

  Mutation: {
    createShoes: (root, { input }) => {
      const shoes = new Shoes(input);
      // no .exec();
      shoes.save();
      return shoes;
    }
  },
  Shoes: {
    brand: (parent) => {
      return Brand.findOne({ _id: parent.brand }).exec();
    }
  }
};
module.exports = resolvers;
// export default resolvers;