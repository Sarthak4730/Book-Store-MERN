const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.use( express.json() );
const cors = require('cors');
app.use( cors( {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
} ) );
const bookRoutes = require('./src/books/book.route');
app.use('/api/books', bookRoutes);

require('dotenv').config();
async function main(){
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send("book store server");
    });
}
main().then(() => console.log("MongoDB Atlas-Mongoose connected successfully")).catch(err => console.log(err));

app.listen(3000);