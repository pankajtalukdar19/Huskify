const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        default: '',
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
    avatarUrl: {
        type: String,
        trim: true
    },
    points_available: {
        type: Number,
        min: 0,
        default: 0
    },
    points_redeemed: {
        type: Number,
        min: 0,
        default: 0
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    role: {
        type: String,
        enum: ['user', 'vendor', 'admin'],
        default: 'user'
    },
    otp: {
        code: String,
        expiresAt: Date
    },
    refreshToken: String
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
