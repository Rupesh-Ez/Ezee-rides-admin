import mongoose from "mongoose";

const userSchema = new mongoose.Schema({}, { strict: false });
const UserModel = mongoose.model('users', userSchema, 'users');

export const getAllCustomer = async (req, res) => {
    try {
        const customers = await UserModel.find({}).sort({ savedAt: -1 })
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

export const deleteCustomer = async (req, res) => {
    try {
      const { _id } = req.body;
  
      // Validate that ID is provided
      if (!_id) {
        return res.status(400).json({
          success: false,
          message: 'Customer ID is required'
        });
      }
      // Find and delete the region
      const deletedCustomer = await UserModel.findByIdAndDelete(_id);
  
      // Check if region was actually found and deleted
      if (!deletedCustomer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found'
        });
      }
      res.status(200).json({
        success: true,
        message: 'Customer deleted successfully',
      });
  
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error deleting Customer:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  };

export const getCustomerById = async (req, res) => {
    try {
      const { phoneno } = req.body;
  
      // Validate that ID is provided
      if (!phoneno) {
        return res.status(400).json({
          success: false,
          message: 'Customer ID is required'
        });
      }
      // Find and delete the region
      const Customer = await UserModel.findOne({phoneNumber:phoneno});
  
      // Check if region was actually found and deleted
      if (!Customer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found'
        });
      }
      res.status(200).json({
        success: true,
        message: 'Customer found successfully',
        data:Customer
      });
  
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error fetching Customer:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  };

  export default UserModel;