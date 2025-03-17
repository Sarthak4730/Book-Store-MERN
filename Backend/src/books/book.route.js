const express = require('express');
const router = express.Router();

const Book = require('./book.model');

router.post('/create-book', async (req, res) => {
    try {
        const newBook = await Book( { ...req.body } );
        await newBook.save();
        console.error("Success creating book");
        res.status(200).send( { message: "Book posted successfully", book: newBook } );
    } catch (error) {
        console.error("Error creating book: ", error);
        res.status(500).send( { message: "Book post failed" } );
    }
});
router.get('/get-book', async (req, res) => {

});
router.put('/update-book', async (req, res) => {

});
router.delete('/delete-book', async (req, res) => {

});

module.exports = router;