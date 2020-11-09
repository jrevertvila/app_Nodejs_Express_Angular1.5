let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let slug = require('slug');
require('./Brand');
require('./Category');
let Brand = mongoose.model('Brand');
let Category = mongoose.model('Category');

let ItemSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  name: String,
  description: String,
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  sizes: [{type: String}],
  colors: [{type: String}],
  images: [{type: String}]
}, {timestamps: true});

ItemSchema.plugin(uniqueValidator, {message: 'is already taken'});

ItemSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

ItemSchema.methods.slugify = function() {
    this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

ItemSchema.methods.toJSONFor = function(brand){  
  return {
    slug: this.slug,
    name: this.name,
    description: this.description,
    category: category.toJSONFor(),
    brand: brand.toJSONFor(),
    sizes: this.sizes,
    colors: this.colors,
    images: this.images,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Item', ItemSchema);