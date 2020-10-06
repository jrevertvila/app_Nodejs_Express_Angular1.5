var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var ReleaseSchema = new mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    title: String,
    description: String,
    body: String,
    version: String,
    tagList: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

ReleaseSchema.plugin(uniqueValidator, {message: 'is already taken'});

ReleaseSchema.pre('validate', function(next){
    if(!this.slug)  {
        this.slugify();
    }
    next();
});

ReleaseSchema.methods.slugify = function() {
    this.slug = slug(this.author.username) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};


ReleaseSchema.methods.toJSONFor = function(user){
    return {
        _id: this._id,
        slug: this.slug,
        title: this.title,
        description: this.description,
        body: this.body,
        version: this.version,
        tagList: this.tagList,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: this.author.toProfileJSONFor(user)
    };
  };
  
mongoose.model('Release', ReleaseSchema);