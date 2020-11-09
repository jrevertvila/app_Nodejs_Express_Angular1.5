const mongoose = require('mongoose');
const Category = mongoose.model('Category');

const resolvers = {
    Query: {
      category: (root, {slug}) => {
        return Category.findOne({slug: slug}).exec();
      },
      categories: () => {
        return Category.find().exec();
      },
    },

    Mutation: {
      createCategory: (root, {input}) => {
          const category = new Category(input);
          category.save();
          return category;
      },
      deleteCategory: (root, {input}) => {
        const ok = Boolean(input.slug)
        Category.remove({"slug":input.slug}).exec();
        return {ok:ok};
    }
  },
};
module.exports = resolvers;
// export default resolvers;