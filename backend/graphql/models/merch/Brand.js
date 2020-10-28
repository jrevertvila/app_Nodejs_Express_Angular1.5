var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var BrandSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  name: String,
  description: String,
  web: String
}, {
  timestamps: true,
  usePushEach: true
});

BrandSchema.plugin(uniqueValidator, {message: 'is already taken'});

BrandSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

BrandSchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

BrandSchema.methods.toJSONFor = function(){
  return {
    slug: this.slug,
    name: this.name,
    description: this.description,
    web: this.web
  };
};

mongoose.model('Brand', BrandSchema);