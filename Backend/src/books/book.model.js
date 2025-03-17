const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    original_language: String,
    first_published: Number,
    approximate_sales: String,
    genre: String,
    image: String,
    price: String
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;