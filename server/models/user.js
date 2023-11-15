const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    isPremiumUser: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema);

