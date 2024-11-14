const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\d+$/, 'Phone number must contain only digits']
    },
    points_available: {
        type: Number,
        min: 0
    },
    points_redeemed: {
        type: Number,
        min: 0
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HmgNode',
    },
    role: {
        type: String,
        enum: ['user', 'customer', 'admin'],
        default: 'user'
      },
      otp: {
        code: String,
        expiresAt: Date
      },
      refreshToken: String
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
