const Coupon = require('../models/coupon.model');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
const crypto = require('crypto');
const mongoose = require('mongoose');

const generateCouponCode = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
};

module.exports = {
    create: async (req, res) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { userId, vendorId, coins } = req.body;

            // Verify user has enough coins
            const user = await User.findById(userId).session(session);
            if (!user || user.points_available < coins) {
                await session.abortTransaction();
                return res.status(400).json({
                    success: false,
                    msg: "Insufficient points"
                });
            }

            // Create coupon
            const coupon = new Coupon({
                userId,
                vendorId,
                code: generateCouponCode(),
                coins,
                expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
            });

            await coupon.save({ session });

            // Create transaction record
            const transaction = new Transaction({
                userId,
                vendorId,
                type: 'generate',
                points: coins,
                couponId: coupon._id,
                description: `Generated ${coins} points for coupon ${coupon.code}`
            });

            await transaction.save({ session });

            await session.commitTransaction();
            res.status(201).json({
                success: true,
                msg: "Coupon created successfully",
                data: {
                    coupon,
                    transaction
                }
            });
        } catch (error) {
            await session.abortTransaction();
            res.status(500).json({
                success: false,
                msg: "Error creating coupon",
                error: error.message
            });
        } finally {
            session.endSession();
        }
    },

    getUserCoupons: async (req, res) => {
        try {
            const coupons = await Coupon.find({ userId: req.params.userId })
                .populate('vendorId', 'name email')
                .sort('-createdAt');

            res.json({
                success: true,
                msg: "Coupons retrieved successfully",
                data: coupons
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Error retrieving coupons",
                error: error.message
            });
        }
    }
};
