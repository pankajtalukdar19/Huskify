const Transaction = require('../models/transaction.model');

module.exports = {
    getUserTransactions: async (req, res) => {
        try {
            const transactions = await Transaction.find({ userId: req.params.userId })
                .populate('vendorId', 'name email')
                .populate('couponId', 'code')
                .sort('-createdAt');

            res.json({
                success: true,
                msg: "Transactions retrieved successfully",
                data: transactions
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                msg: "Error retrieving transactions",
                error: error.message
            });
        }
    }
};
