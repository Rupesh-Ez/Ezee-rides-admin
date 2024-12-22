import mongoose from "mongoose";
const termSchema = new mongoose.Schema({
    terms: {
        type: String,
        required: true,
        trim: true,
    },
},
{
    timestamps:true,
})

export const Terms = mongoose.model('Terms', termSchema);