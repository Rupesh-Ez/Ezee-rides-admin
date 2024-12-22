import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({}, { strict: false });
const RideModel = mongoose.model('rides', rideSchema, 'rides');

export const getAllRides = async (req, res) => {
    try {
        const rides = await RideModel.find({});
        return res.status(200).json({
            success: true,
            message: 'Rides fetched successfully',
            data: rides,
        });

    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch Rides data' });
    }

};

export const getRideCount = async (req, res) => {
    try {
        const RideCount = await RideModel.countDocuments({});

        return res.status(200).json({
            success: true,
            message: 'Ride count fetched successfully',
            count: RideCount,
        });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch Ride count' });
    }
};

export const getLatestRides = async (req, res) => {
    try {
        const rides = await RideModel.find({})
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (-1)
            .limit(6);
        return res.status(200).json({
            success: true,
            message: 'Rides fetched successfully',
            data: rides,
        });

    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch Rides data' });
    }

};