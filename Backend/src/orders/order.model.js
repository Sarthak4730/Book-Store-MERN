const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: Number,
    address: {
        area: String,
        city: String,
        state: String,
        pincode: Number
    },
    productIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    totalPrice: Number
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;