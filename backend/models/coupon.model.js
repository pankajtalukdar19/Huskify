const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    coins: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['generated', 'used', 'expired'],
        default: 'generated'
    },
    expiryDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Coupon', couponSchema);
