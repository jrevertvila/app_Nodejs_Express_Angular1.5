var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var CategorySchema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    name: String,
    description: String
}, {
    timestamps: true,
    usePushEach: true
});

CategorySchema.plugin(uniqueValidator, { message: 'is already taken' });

CategorySchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});

CategorySchema.methods.slugify = function () {
    this.slug = slug(this.name) + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

CategorySchema.methods.toJSONFor = function () {
    return {
        _id: this._id,
        slug: this.slug,
        name: this.name,
        description: this.description,
    };
};

mongoose.model('Category', CategorySchema);