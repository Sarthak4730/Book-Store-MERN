const express = require('express');
const router = express.Router();

const Book = require('./book.model');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        // console.log("Success getting books");
        res.status(200).send( { message: "Books fetched successfully", books: books } );
    } catch (error) {
        console.error("Error getting books: ", error);
        res.status(500).send( { message: "Books get failed" } );
    }
});

router.post('/create-book', async (req, res) => {
    try {
        const newBook = await Book( { ...req.body } );
        await newBook.save();
        // console.log("Success creating book");
        res.status(200).send( { message: "Book posted successfully", book: newBook } );
    } catch (error) {
        console.error("Error creating book: ", error);
        res.status(500).send( { message: "Book post failed" } );
    }
});


router.get('/get-specific-book/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        // console.log("Success getting the book");
        if( !book ) res.status(404).send( { message: "Book Not Found: this book does not exist" } );
        else res.status(200).send( { message: "Book fetched successfully", book: book } );
    } catch (error) {
        console.error("Error getting the book: ", error);
        res.status(500).send( { message: "Book get failed" } );
    }
});

router.put('/update-book/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate( id, req.body, { new: true } );
        // console.log("Success updating the book");
        if( !updatedBook ) res.status(404).send( { message: "Book Not Found: this book does not exist, hence cannot be updated" } );
        else res.status(200).send( { message: "Book updated successfully", updatedBook } );
    } catch (error) {
        console.error("Error updating the book: ", error);
        res.status(500).send( { message: "Book update failed" } );
    }
});

router.delete('/delete-book/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        // console.log("Success deleting the book");
        if( !book ) res.status(404).send( { message: "Book Not Found: this book does not exist, hence cannot be deleted" } );
        else res.status(200).send( { message: "Book deleted successfully" } );
    } catch (error) {
        console.error("Error deleting the book: ", error);
        res.status(500).send( { message: "Book delete failed" } );
    }
});

module.exports = router;