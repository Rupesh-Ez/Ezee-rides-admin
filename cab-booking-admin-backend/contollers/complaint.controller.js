import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({}, { strict: false });
const ComplaintModel = mongoose.model('complaints', complaintSchema, 'complaints');

export const getAllComplaints = async (req, res) => {
    try {
        const complaints = await ComplaintModel.find({});
        return res.status(200).json({
            success: true,
            message: 'complaints fetched successfully',
            data: complaints,
        });

    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch complaints data' });
    }

};

export const getComplaintCount = async (req, res) => {
    try {
        const complaintCount = await ComplaintModel.countDocuments({});

        return res.status(200).json({
            success: true,
            message: 'Complaint count fetched successfully',
            count: complaintCount,
        });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch complaint count' });
    }
};

export const deleteComplaint = async (req, res) => {
    try {
        const { _id } = req.body;


        // Validate that ID is provided
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'complaint ID is required'
            });
        }

        // Find and delete the region
        await Service.findByIdAndDelete(_id);

        res.status(200).json({
            success: true,
            message: 'complaint deleted successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getComplaintById = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'Complaint ID required',
            });
        }

        const Complaint = await ComplaintModel.findById(_id)
            .select('-__v') // Exclude version key
            .lean(); // Convert to plain JavaScript object

        // Check if service exists
        if (!Complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found',
            });
        }

        // Return the service details
        return res.status(200).json({
            success: true,
            data: Complaint,
            message: 'Complaint retrieved successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
}

export const updateComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            subject,
            rideRequest,
            rider,
            complaintBy,
            status,
            driver,
            description,
        } = req.body;

        const existingComplaint = await ComplaintModel.findById(id);
        if (!existingComplaint) {
            return res.status(404).json({
                message: "Complaint not found",
                success: false,
            });
        }

        const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
            id,
            {
                subject,
                rideRequest,
                rider,
                complaintBy,
                status,
                driver,
                description,
            },
            {
                new: true,  // Return the updated document
                runValidators: true  // Run model validations
            }
        );

        // Respond with the updated service
        return res.status(200).json({
            message: "Complaint updated successfully",
            success: true,
        });

    } catch (error) {
        console.error('Error updating Complaint:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }

}