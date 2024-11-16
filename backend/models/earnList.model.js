const mongoose = require('mongoose');
const EarnModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    doc: {
        type: String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    earnPoints:{
        type : Number,
        required:true
    }

}, {
    timestamps: true
});

const Earn = mongoose.model('earn', EarnModel);
module.exports = Earn
