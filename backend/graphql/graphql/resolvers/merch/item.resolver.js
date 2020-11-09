const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const Brand = mongoose.model('Brand');
const Category = mongoose.model('Category');
const request = require('../../../routes/api/requests.js');
const auth = require('../../../routes/auth.js');

const resolvers = {
  Query: {
    item: (root, { slug }, req) => {
      // console.log(req.payload);
      // request.getUser("hola",req);

      return Item.findOne({ slug: slug }).exec();

    },
    items: () => {
      return Item.find().exec();
    },

    wishlisted: async () => {
      return await request.getWishlisted().then(async (data) => {
        return await Item.find({ '_id': { $in: data } }).exec();
      });
      // 
    },
  },

  Mutation: {
    createItem: (root, { input }) => {
      const item = new Item(input);
      // no .exec();
      item.save();
      return item;
    }
  },

  Item: {
    brand: (parent) => {
      return Brand.findOne({ _id: parent.brand }).exec();
    },
    category: (parent) => {
      return Category.findOne({ _id: parent.category }).exec();
    }
  }
};
module.exports = resolvers;