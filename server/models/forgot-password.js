const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ForgotPassword = new Schema({
    token: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('ForgotPassword', ForgotPassword);

