const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emailotpSchema = new Schema({
    email: {type:String, required: true},
    otp_sendtime: {type: Date, default: Date.now},
    otp_expiretime: {type: Date, default: Date.now},
    otp: {type: String, maxLength:6, required: true}
});

module.exports = mongoose.model("EmailOTP",emailotpSchema);