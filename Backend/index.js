const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');

const app = express();
app.use( express.json() );
app.use( cors( {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
} ) );
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/admin', getAdminRoutes);

// require('dotenv').config();

async function main(){
    // await mongoose.connect(process.env.DB_URL);
    await mongoose.connect('mongodb+srv://sarthakasm07:test123@cluster0.b18x2.mongodb.net/book-store?retryWrites=true&w=majority&appName=Cluster0');
    app.use('/', (req, res) => {
        res.send("book store server");
    });
}
main().then(() => console.log("MongoDB Atlas-Mongoose connected successfully")).catch(err => console.log(err));

app.listen(3000);