const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    customer_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    transaction_type: {
        type: String,
        required: true,
        enum: ['Points Earned', 'Points Redeemed'],
    },
    points_spent: {
        type: Number,
        required: true,
    },

})
const transactions = mongoose.model('transactons', transactionSchema)

module.exports =  transactions;