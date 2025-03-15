const express = require('express');
const app = express();

const mongoose = require('mongoose');

async function main(){
    await mongoose.connect("mongodb+srv://sarthakasm07:W6pp1r9InPuAV9wy@cluster0.b18x2.mongodb.net/book-store?retryWrites=true&w=majority&appName=Cluster0");
    app.use('/', (req, res) => {
        res.send("book store server");
    });
}
main().then(() => console.log("MongoDB Atlas-Mongoose connected successfully")).catch(err => console.log(err));

app.listen(3000);