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
    items: (_, {limit, offset}) => {
      return Item.find().skip(offset).limit(limit).exec();
    },

    wishlisted: async (_, {limit, offset}) => {
      return await request.getWishlisted().then(async (data) => {
        return await Item.find({ '_id': { $in: data } }).skip(offset).limit(limit).exec();
      });
      // 
    },

    wishlist: async (_, {items}) => {

      return Item.find({ '_id': { $in: items }  }).exec();

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