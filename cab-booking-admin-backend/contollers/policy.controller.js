import { Policy } from "../models/policy.models.js";

export const savePolicy = async ( req,res)=>{
    try {
        
        const {policy} = req.body;
        await Policy.findOneAndUpdate(
            {}, // Empty filter to target the first/only document
            { policy }, // Update with new terms
            { 
                upsert: true, // Create the document if it doesn't exist
                new: true // Return the updated document
            }
        );
        return res.status(201).json({
            message:"policy updated successfully",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getPolicy = async ( req,res)=>{
    try {
        const policy = await Policy.findOne({});
        
        
        // If no terms found, return a 404 response
        if (!policy) {
            return res.status(404).json({
                message: "No policy found",
                success: false,
                data:null
            });
        }
        
        // Return the terms successfully
        return res.status(200).json({
            message: "policy retrieved successfully",
            success: true,
            data: policy
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}