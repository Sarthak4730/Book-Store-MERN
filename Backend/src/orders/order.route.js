const express = require('express');
const router = express.Router();

const Order = require('./order.model');

const nodemailer = require("nodemailer");

router.post('/create-order', async (req, res) => {
    try {
        const newOrder = await Order( { ...req.body } );
        // console.log("newOrder: ",newOrder);
        const userEmail = newOrder.email;
        await newOrder.save();
        // console.log("Success creating order");
        res.status(200).send( { message: "Order posted successfully", order: newOrder } );

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const populatedOrder = await newOrder.populate('productIds');
        const mailOptions = {
            to: userEmail,
            from: `"SKY Store" <${process.env.EMAIL_USER}>`,
            subject: "Your order has been placed successfully",
            html: `
                <p>Thank you for your purchase</p>
                <b><u>Books Purchased - Order Summary :-</u></b>
                <ol style="padding-left: 20px; font-family: Arial, sans-serif;">
                    ${ populatedOrder.productIds.map( book => `
                        <li style="margin-bottom: 25px;">
                            <div style="margin-left: 10px;">
                                <span>${book.title}</span>
                                <img src=${book.image} alt="bookPic" width="140" height="210"/>
                                <span>Price = <b>${book.price}</b></span>
                            </div>
                        </li>
                    ` ) }
                </ol>
                <h2>Total: ₹${newOrder.totalPrice}</h2>
                <p><b><u>Deliver to the address:</u></b>
                <div>
                    <p>${newOrder.name},</p>
                    <p>${newOrder.address.area},</p>
                    <p>${newOrder.address.city},</p>
                    <p>${newOrder.address.state} - ${newOrder.address.pincode}</p>
                </div>
                <i><b>If you have any feedback for our website, reply to this mail, thank you for using our service.</b></i>
            `
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error creating order: ", error);
        res.status(500).send( { message: "Order post failed" } );
    }
});

router.get('/get-orders/:email', async (req, res) => {
    try {
        const { email } = req.params;
        // console.log("email ", email);

        const orders = await Order.find( { email } ).sort( { createdAt: -1 } );
        if( !orders ) return res.status(404).json( { message: "Orders not found" } );

        res.status(200).send( { message: "Orders fetched successfully", orders } );
    } catch (error) {
        console.error("Error getting orders: ", error);
        res.status(500).send( { message: "Orders get failed" } );
    }
});

module.exports = router;