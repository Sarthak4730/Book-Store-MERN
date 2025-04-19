const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: String,
    code: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // 300 seconds = 5 minutes
    }
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;