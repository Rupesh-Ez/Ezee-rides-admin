import mongoose from "mongoose";

const userSchema = new mongoose.Schema({}, { strict: false });
const UserModel = mongoose.model('users', userSchema, 'users');

export const getAllCustomer = async (req, res) => {
    try {
        const customers = await UserModel.find({});
        return res.status(200).json({
            success: true,
            message: 'Customer fetched successfully',
            data: customers,
        });

    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch Customer data' });
    }

};

export const getCustomerCount = async (req, res) => {
    try {
        const CustomerCount = await UserModel.countDocuments({});

        return res.status(200).json({
            success: true,
            message: 'Customer count fetched successfully',
            count: CustomerCount,
        });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch Customer count' });
    }
};