import { Service } from '../models/service.model.js';

export const createService = async (req, res) => {
    try {
        
        const {
            name,
            region,
            regionId,
            baseFare,
            nightCharges,
            // surgeCharges,
            minimumDistance,
            minimumFare,
            perDistance,
            perDistanceLarge,
            perMinuteWait,
            adminCommission,
            waitingTimeLimit,
            commissionType,
            paymentMethod,
            status,
            description,
        } = req.body;

        if (
            !name ||
            !region ||
            baseFare === undefined ||
            minimumDistance === undefined ||
            minimumFare === undefined ||
            perDistance === undefined ||
            adminCommission === undefined
        ) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }


        const newService = new Service({
            name,
            region,
            regionId,
            baseFare,
            nightCharges,
            // surgeCharges,
            minimumDistance,
            minimumFare,
            perDistance,
            perDistanceLarge,
            perMinuteWait,
            adminCommission,
            waitingTimeLimit,
            commissionType: commissionType || "Fixed",
            paymentMethod: paymentMethod || "Cash",
            status: status || "Inactive",
            description: description || "",
        });

        await newService.save();

        // Return success response
        return res.status(201).json({
            message: "Created service successfully",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });

    }
}

export const getAllService = async (req, res) => {
    try {
        const service = await Service.find(); // Fetch all regions
        return res.status(200).json({
            success: true,
            message: 'service fetched successfully',
            data: service,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { _id } = req.body;


        // Validate that ID is provided
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'Service ID is required'
            });
        }

        // Find and delete the region
        const deletedService = await Service.findByIdAndDelete(_id);

        // Check if region was actually found and deleted
        if (!deleteService) {
            return res.status(404).json({
                success: false,
                message: 'service not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'service deleted successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'service ID required',
            });
        }
        
        const service = await Service.findById(_id)
            .select('-__v') // Exclude version key
            .lean(); // Convert to plain JavaScript object

        // Check if service exists
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found',
            });
        }

        // Return the service details
        return res.status(200).json({
            success: true,
            data: service,
            message: 'Service retrieved successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
}

export const updateService = async(req,res)=>{
    try {
        const { id } = req.params;
        const {
            name,
            region,
            regionId,
            baseFare,
            nightCharges,
            // surgeCharges,
            minimumDistance,
            minimumFare,
            perDistance,
            perDistanceLarge,
            perMinuteWait,
            adminCommission,
            waitingTimeLimit,
            commissionType,
            paymentMethod,
            status,
            description,
        } = req.body;

        if (
            !name ||
            !region ||
            baseFare === undefined ||
            minimumDistance === undefined ||
            minimumFare === undefined ||
            perDistance === undefined ||
            adminCommission === undefined
        ) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }
        const existingService = await Service.findById(id);
        if (!existingService) {
            return res.status(404).json({
                message: "Service not found",
                success: false,
            });
        }

        // Update the service
        const updatedService = await Service.findByIdAndUpdate(
            id,
            {
                name,
                region,
                regionId,
                baseFare,
                nightCharges,
                // surgeCharges,
                minimumDistance,
                minimumFare,
                perDistance,
                perDistanceLarge,
                perMinuteWait,
                adminCommission,
                waitingTimeLimit,
                commissionType,
                paymentMethod,
                status,
                description,
            },
            { 
                new: true,  // Return the updated document
                runValidators: true  // Run model validations
            }
        );

        // Respond with the updated service
        return res.status(200).json({
            message: "Service updated successfully",
            success: true,
        });

    } catch (error) {
        console.error('Error updating service:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
    
}