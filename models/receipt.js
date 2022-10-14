const mongoose = require('mongoose')


const receiptSchema = new mongoose.Schema({
    childsName:{
        type:String,
        required:true,
    },
    totalAmount:{
        type:String,
        required: true,
    },
    amountPaying:{
        type:String,
        required:true,
    },
    amountOwing:{
        type: String,
        required:true,
    },
    studentID:{
        type: String,
        required: true,
    },
},{timestamps:true});

const receiptModel = mongoose.model('receipt',receiptSchema);

module.exports = receiptModel;