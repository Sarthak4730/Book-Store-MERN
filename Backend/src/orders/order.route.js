const express = require('express');
const router = express.Router();

const Order = require('./order.model');

router.post('/create-order', async (req, res) => {
    try {
        const newOrder = await Order( { ...req.body } );
        await newOrder.save();
        // console.log("Success creating order");
        res.status(200).send( { message: "Order posted successfully", order: newOrder } );
    } catch (error) {
        console.error("Error creating order: ", error);
        res.status(500).send( { message: "Order post failed" } );
    }
});

router.get('/get-orders/:email', async (req, res) => {
    try {
        const { email } = req.params;
        // console.log("email ",email);

        const orders = await Order.find( { email } ).sort( { createdAt: -1 } );
        if( !orders ) return res.status(404).json( { message: "Orders not found" } );

        res.status(200).send( { message: "Orders fetched successfully", orders } );
    } catch (error) {
        console.error("Error getting orders: ", error);
        res.status(500).send( { message: "Orders get failed" } );
    }
});

module.exports = router;