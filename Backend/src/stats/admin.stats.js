const express = require("express");
const router = express.Router();

const Order = require("../orders/order.model");
const Book = require("../books/book.model");

router.get("/", async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();

        const totalValue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalValue: { $sum: "$totalPrice" }
                }
            }
        ]);

        const totalBooks = await Book.countDocuments();

        res.status(200).json({
            totalOrders,
            totalValue: totalValue[0]?.totalValue,
            totalBooks
        })
    } catch (error) {
        console.error("Error fetching admin stats", error);
        res.status(500).json( { message: "Failed to fetch admin stats" } );
    }
});

module.exports = router;