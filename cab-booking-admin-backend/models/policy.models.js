import mongoose from "mongoose";
const policySchema = new mongoose.Schema({
    policy: {
        type: String,
        required: true,
        trim: true,
    },
},
{
    timestamps:true,
})

export const Policy = mongoose.model('Policy', policySchema);