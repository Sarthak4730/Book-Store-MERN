const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const OTP = require("./otp.model");
const User = require("../users/user.model");

const express = require('express');
const router = express.Router();

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = otpGenerator.generate( 6, { upperCaseAlphabets: false, specialChars: false } );
    await OTP.create( { email, code: otp } );

    const transporter = nodemailer.createTransport( {
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    } );

    await transporter.sendMail( {
        to: email,
        // from: process.env.EMAIL_USER,
        from: `"SKY Store" <${process.env.EMAIL_USER}>`,
        subject: "Your OTP Code",
        html: `<h1>${otp}</h1> <p>Valid for 5 minutes</p>`
    } );

    res.status(200).json( { message: `OTP sent: ${otp}` } );
});

router.post('/verify-otp', async (req, res) => {
    const { email, code } = req.body;
    const otpEntry = await OTP.findOne( { email, code } );

    if( !otpEntry || (new Date() - otpEntry.createdAt) > 5 * 60 * 1000 ) return res.status(400).json( { message: "Invalid or expired OTP" } );
    
    const user = await User.findOne( { email } );
    res.status(200).json( { message: "OTP verified", user } );
});

module.exports = router;