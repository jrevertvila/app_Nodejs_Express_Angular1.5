const mongoose = require('mongoose');
const Shoes = mongoose.model('Shoes');
const Brand = mongoose.model('Brand');
const request = require('../../../routes/api/requests.js');
const auth = require('../../../routes/auth.js');

const resolvers = {
  Query: {
    shoes: (root, { slug }, req) => {
      // console.log(req.payload);
      console.log(req.payload);
      request.getUser("hola");

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