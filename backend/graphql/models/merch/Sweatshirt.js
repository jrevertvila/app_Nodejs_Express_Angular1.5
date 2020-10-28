var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
require('./Brand');

var Brand = mongoose.model('Brand');

var SweatshirtSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  name: String,
  description: String,
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  sizes: [{type: String}],
  colors: [{type: String}],
  images: [{type: String}]
}, {timestamps: true});

SweatshirtSchema.plugin(uniqueValidator, {message: 'is already taken'});

SweatshirtSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

SweatshirtSchema.methods.slugify = function() {
    this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

SweatshirtSchema.methods.toJSONFor = function(brand){  
  return {
    slug: this.slug,
    name: this.name,
    description: this.description,
    brand: brand.toJSONFor(),
    sizes: this.sizes,
    colors: this.colors,
    images: this.images,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Sweatshirt', SweatshirtSchema);