import mongoose from "mongoose";
const dealSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})
export const Deals = mongoose.model('Deals',dealSchema);