import mongoose from "mongoose";
const withdrawRequestSchema = new mongoose.Schema({
    phoneNo:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    },
    request:{
        type:Number,
        required:true
    },

},{timestamps:true})
export const withdrawRequests = mongoose.model('WithDrawRequests',withdrawRequestSchema);