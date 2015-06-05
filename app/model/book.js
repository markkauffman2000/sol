var mongoose = require('mongoose');

module.exports = mongoose.model('Book',
{
    title : String,
    author : String,
    description : String,
    isbn : String,
    publicationDate : Date,
    price : Number
});
