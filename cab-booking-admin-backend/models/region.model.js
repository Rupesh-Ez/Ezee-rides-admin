import mongoose from "mongoose";
const regionSchema = new mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    timezone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    coordinates:[
        {
          lat: { type: Number, required: true },
          lng: { type: Number, required: true }
        }
    ] 
},{timestamps:true})
export const Region = mongoose.model('Region',regionSchema);