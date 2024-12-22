import { Terms } from "../models/terms.model.js";

export const saveTerms = async ( req,res)=>{
    try {
        
        const {terms} = req.body;
        await Terms.findOneAndUpdate(
            {}, // Empty filter to target the first/only document
            { terms }, // Update with new terms
            { 
                upsert: true, // Create the document if it doesn't exist
                new: true // Return the updated document
            }
        );
        return res.status(201).json({
            message:"terms Updated successfully",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}

export const getTerms = async ( req,res)=>{
    try {
        const terms = await Terms.findOne({});
        
        // If no terms found, return a 404 response
        if (!terms) {
            return res.status(404).json({
                message: "No terms found",
                success: false
            });
        }
        
        // Return the terms successfully
        return res.status(200).json({
            message: "Terms retrieved successfully",
            success: true,
            data: terms
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}