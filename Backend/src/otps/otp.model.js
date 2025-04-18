const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: String,
    code: String
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;