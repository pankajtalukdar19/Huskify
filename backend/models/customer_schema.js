const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d+$/, 'Phone number must contain only digits']
    },
    points_available: {
        type: Number,
        required: true,
        min: 0
    },
    points_redeemed: {
        type: Number,
        required: true,
        min: 0
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HmgNode',
        required: true
    }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;