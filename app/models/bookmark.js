const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const shorthash = require('shorthash');

const bookmarkSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    originalURL: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (value) {
                return validator.isURL(value)
            },
            message: function () {
                return 'Invalid URL'
            }
        }
    },

    // tags: [{
    //     type: String,
    //     // required: true
    // }],
    // tags: [String],
    //tags: {type: [String], required: true}

    tags: {
        type: [String],
        // required: true,
        validate: {
            validator: function (value) {
                // console.log(this.tags.length)
                // console.log(value.length)
                return !(value.length <= 0)
            },
            message: function () {
                return 'Tags need to be specified'
            }
        }
    },
    hashedURL: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

bookmarkSchema.pre('save', function (next) {
    let bookmark = this;
    // let inputTags = this.tags;
    // for (var i = 0; i < inputTags.length; i++) {
    //     this.tags.push(inputTags[i]);
    // }
    bookmark.hashedURL = shorthash.unique(bookmark.originalURL);
    // console.log('url->', bookmark.originalURL)
    next();
    // if (bookmark.isNew) {
    //     bookmark.hashedURL = shorthash.unique(bookmark.originalURL);
    //     next();
    // } else {
    //     next();
    // }

});

bookmarkSchema.pre("findOneAndUpdate", function (next) {
    let bookmark = this;
    console.log('pre-hook ran')
    bookmark.hashedURL = shorthash.unique(bookmark.originalURL);
    console.log(next)
    next();
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = {
    Bookmark
}