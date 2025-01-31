import { Deals } from '../models/deal.model.js'

export const getAllDeals = async (req, res) => {
    try {
        const deals = await Deals.find({}, 'title createdAt updatedAt');

        return res.status(200).json({
            success: true,
            message: 'Deals fetched successfully',
            data: deals,
        });

    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch deals data' });
    }
};


export const saveDeal = async (req, res) => {
    try {
        const { title, image } = req.body; 

        if (!title || !image) {
            return res.status(400).json({
                message: "Title or image is missing",
                success: false
            });
        }

        await Deals.create({
            title,
            image, 
        });

        return res.status(201).json({
            message: "Deal created successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });

    }
}

export const deleteDeal = async (req, res) => {
    try {
        const { _id } = req.body;

        // Validate that ID is provided
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'deal ID is required'
            });
        }

        // Find and delete the region
        await Deals.findByIdAndDelete(_id);

        res.status(200).json({
            success: true,
            message: 'Deal deleted successfully',
        });

    } catch (error) {
        console.error('Error deleting deal:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};
