import Coupon from '../models/coupon.model.js';

export const saveCoupon = async (req, res) => {
    try {
        // Destructure request body
        const {
            code,
            title,
            status,
            couponType,
            region,
            service,
            usageLimit,
            startDate,
            endDate,
            discountType,
            discount,
            maxDiscount,
            minimumAmount,
            description
        } = req.body;

        // Validate required fields
        if (!code || !title || !startDate || !endDate || discount === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Check if coupon code already exists
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({
                success: false,
                message: 'Coupon code already exists'
            });
        }

        // Create new coupon
        const newCoupon = new Coupon({
            code,
            title,
            status: status || 'Inactive',
            couponType: couponType || 'All',
            region,
            service,
            usageLimit,
            startDate,
            endDate,
            discountType: discountType || 'Fixed',
            discount,
            maxDiscount,
            minimumAmount,
            description,
            users: 0,
        });

        // Save coupon to database
        const savedCoupon = await newCoupon.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: 'Coupon created successfully',
            data: savedCoupon
        });

    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: validationErrors
            });
        }

        // Log the error for server-side tracking
        console.error('Error in saveCoupon:', error);

        // Generic server error response
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getCouponCount = async (req, res) => {
    try {
        const CouponCount = await Coupon.countDocuments({});

        return res.status(200).json({
            success: true,
            message: 'Coupon count fetched successfully',
            count: CouponCount,
        });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch Coupon count' });
    }
};

export const getAllCoupons = async (req, res) => {
    try {
        const coupon = await Coupon.find(); // Fetch all regions
        return res.status(200).json({
            success: true,
            message: 'coupon fetched successfully',
            data: coupon,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export const deleteCoupon = async (req, res) => {
    try {
        const { _id } = req.body;

        // Validate that ID is provided
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'coupon ID is required'
            });
        }

        // Find and delete the region
        const deletedCoupon = await Coupon.findByIdAndDelete(_id);

        // Check if region was actually found and deleted
        if (!deletedCoupon) {
            return res.status(404).json({
                success: false,
                message: 'Coupon not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Coupon deleted successfully',
            deletedCoupon: deletedCoupon
        });

    } catch (error) {
        // Handle any unexpected errors
        console.error('Error deleting coupon:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getCouponById = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'coupon ID required',
            });
        }

        const coupon = await Coupon.findById(_id)
            .select('-__v') // Exclude version key
            .lean(); // Convert to plain JavaScript object


        // Check if service exists
        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: 'coupon not found',
            });
        }

        // Return the service details
        return res.status(200).json({
            success: true,
            data: coupon,
            message: 'coupon retrieved successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
}

export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            code,
            title,
            status,
            couponType,
            region,
            service,
            usageLimit,
            startDate,
            endDate,
            discountType,
            discount,
            maxDiscount,
            minimumAmount,
            description
        } = req.body;

        if (!code || !title || !startDate || !endDate || discount === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Update the service
        await Coupon.findByIdAndUpdate(
            id,
            {
                code,
                title,
                status,
                couponType,
                region,
                service,
                usageLimit,
                startDate,
                endDate,
                discountType,
                discount,
                maxDiscount,
                minimumAmount,
                description,
            },
        );

        // Respond with the updated service
        return res.status(200).json({
            message: "coupon updated successfully",
            success: true,
        });

    } catch (error) {
        console.error('Error updating coupon:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }

}