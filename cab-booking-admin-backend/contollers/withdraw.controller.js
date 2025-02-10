import mongoose from "mongoose";
import RideModel from './ride.controller.js'
import DriverModel from './driver.controller.js'
import { withdrawRequests } from "../models/withdrawRequest.model.js";

const withdrawSchema = new mongoose.Schema({}, { strict: false });
const WithdrawModel = mongoose.model('earning', withdrawSchema, 'earning');

export const getAllWithdrawals = async (req, res) => {
    try {
        // Fetch entries with request > 0
        const request = await WithdrawModel.find({ request: { $gt: 0 } });
        return res.status(200).json({
            success: true,
            message: 'Withdrawals fetched successfully',
            data: request,
        });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch withdrawal data' });
    }
};
export const updateRequest = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from params
        const { balance, request } = req.body; // Extract data from request body

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Driver ID is required.",
            });
        }

        const driver = await DriverModel.findOne({phonenumber:id});
        
        if(!driver){
            return res.status(400).json({
                success: false,
                message: "Driver not Found!! Might be Deleted.",
            });
        }

        if (balance == null || request == null) {
            return res.status(400).json({
                success: false,
                message: "Both balance and request are required.",
            });
        }
        const fullname = driver.fullname;
        const email = driver.email;

        await withdrawRequests.create({
            phoneNo: id,
            name :fullname,
            email: email,
            balance,
            request
        })

        const updates = {
            balance: balance - request,
            request: 0,
            updatedAt: new Date(),
        };

        const updatedRequest = await WithdrawModel.findOneAndUpdate(
            { phonenumber: id }, // Filter by phone number
            { $set: updates },   // Apply updates
            { new: true }        // Return updated document
        );

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: "No record found for the given phone number.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Withdrawal request updated successfully.",
            // data: updatedRequest,
        });
    } catch (err) {
        console.error("Error updating withdrawal request:", err);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to update withdrawal data." 
        });
    }
};


export const getWithdrawCount = async (req, res) => {
    try {
        const count = await WithdrawModel.countDocuments({ request: { $gt: 0 } });

        return res.status(200).json({
            success: true,
            message: 'Customer count fetched successfully',
            count: count,
        });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch Customer count' });
    }
};

export const getMonthlyEarnings = async (req, res) => {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

        const earnings = await RideModel.aggregate([
            // Match documents created in the current month
            {
                $match: {
                    createdAt: {
                        $gte: startOfMonth,
                        $lt: endOfMonth,
                    },
                },
            },
            // Group to calculate the total commission
            {
                $group: {
                    _id: null,
                    totalCommission: { $sum: "$commission" },
                },
            },
        ]);

        const totalCommission = earnings.length > 0 ? earnings[0].totalCommission : 0;

        return res.status(200).json({
            success: true,
            message: 'earnings count fetched successfully',
            count: totalCommission,
        });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch earnings count' });
    }
};
export const getTotalEarnings = async (req, res) => {
    try {
        const earnings = await RideModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalCommission: { $sum: "$commission" },
                },
            },
        ]);

        const totalCommission = earnings.length > 0 ? earnings[0].totalCommission : 0;

        return res.status(200).json({
            success: true,
            message: "Total commission fetched successfully",
            count: totalCommission,
        });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch earnings count' });
    }
};

export const getMonthWiseEarnings = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        const earnings = await RideModel.aggregate([
            // Match documents created in the current year
            {
                $match: {
                    createdAt: {
                        $gte: new Date(currentYear, 0, 1), // Start of the current year
                        $lt: new Date(currentYear + 1, 0, 1), // Start of the next year
                    },
                },
            },
            // Project the month for grouping
            {
                $project: {
                    month: { $month: "$createdAt" },
                    commission: 1,
                },
            },
            // Group by month to calculate the total commission
            {
                $group: {
                    _id: { month: "$month" },
                    totalCommission: { $sum: "$commission" },
                },
            },
            // Sort by month
            {
                $sort: {
                    "_id.month": 1,
                },
            },
        ]);

        // Format the response
        const totalEarningsArray = earnings.map((item) => item.totalCommission);

        return res.status(200).json({
            success: true,
            message: "Month-wise earnings of the current year fetched successfully",
            data: totalEarningsArray,
        });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch month-wise earnings" });
    }
};
