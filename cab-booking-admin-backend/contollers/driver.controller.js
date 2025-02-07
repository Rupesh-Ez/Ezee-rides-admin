import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({}, { strict: false });
const DriverModel = mongoose.model('Driver', driverSchema, 'Drivers');

const fileSchema = new mongoose.Schema({}, { strict: false });
const FileModel = mongoose.model('Files', fileSchema, 'Files');

export const getAllDrivers = async (req, res) => {
  try {
    // const drivers = await DriverModel.find({});
    const drivers = await DriverModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: 'drivers fetched successfully',
      data: drivers,
    });

  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch driver data', details: err });
  }
};

export const getDriverCount = async (req, res) => {
  try {
      const DriverCount = await DriverModel.countDocuments({});

      return res.status(200).json({
          success: true,
          message: 'Driver count fetched successfully',
          count: DriverCount,
      });
  } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch Driver count' });
  }
};

export const getDriverById = async (req, res) => {
  try {

    const { id } = req.params;
    
    const driver = await DriverModel.findOne({ phonenumber: id });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'driver not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: driver,
      message: 'driver retrieved successfully',
    });

  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch driver data', details: err });
  }

};

export const getDriverDocs = async (req, res) => {
  try {

    const { id } = req.params;
    const file = await FileModel.findById(id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'file not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'file retrieved successfully',
      data: file,
    });

  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch file data', details: err });
  }

};

export const updateVerificationStatuses = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Extract verification status fields and form data from the request body
    const {
      ACvalidate,
      PANvalidate,
      DLvalidate,
      RCvalidate,
      Vehiclevalidate,
      Identityvalidate,
      bankaccvalidate,
      fullname,
      email,
      dateOfBirth,
      referralCode,
      phonenumber,
      gender,
      vehicletype,
      model,
      color,
      Year,
      vehiclecompany,
      vehiclenumber,
      ownership,
      licensenumber,
      accountHolderName,
      accountNumber,
      ifscCode
    } = req.body;

    // Validate that the required `id` is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Driver ID is required",
      });
    }

    // Prepare verification status updates
    const updates = {
      fullname,
      email,
      dateOfBirth,
      referralCode,
      phonenumber,
      gender,
      vehicletype,
      model,
      color,
      Year,
      vehiclecompany,
      vehiclenumber,
      ownership,
      licensenumber,
      accountHolderName,
      accountNumber,
      ifscCode,
      ACvalidate: !!ACvalidate,
      PANvalidate: !!PANvalidate,
      DLvalidate: !!DLvalidate, 
      DLrejected: !DLvalidate,
      RCvalidate: !!RCvalidate,
      RCrejected: !RCvalidate,
      Vehiclevalidate: !!Vehiclevalidate,
      Vehiclerejected: !Vehiclevalidate,
      Identityvalidate: !!Identityvalidate,
      Identityrejected: !Identityvalidate,
      bankaccvalidate: !!bankaccvalidate,
      bankaccrejected: !bankaccvalidate,
    };

    // If all verifications are true, mark profile as validated
    if (DLvalidate && RCvalidate && Vehiclevalidate && Identityvalidate && bankaccvalidate) {
      updates.profilevalidate = true;
      updates.profilerejected = false;
    } else {
      updates.profilevalidate = false;
      updates.profilerejected = true;
    }

    // Update the driver details and verification statuses in the database
    const updatedDriver = await DriverModel.findOneAndUpdate(
      { phonenumber: id }, // Find driver by phone number
      { $set: updates },   // Apply updates
      { new: true, runValidators: true } // Return updated document
    );

    // Check if the driver was found and updated
    if (!updatedDriver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Driver details and verification statuses updated successfully",
      data: updatedDriver,
    });
  } catch (err) {
    console.error("Error updating driver:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the driver",
      error: err.message,
    });
  }
};


export const deleteDriver = async (req, res) => {
  try {
    const { _id } = req.body;

    // Validate that ID is provided
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: 'Driver ID is required'
      });
    }
    console.log(_id);
    

    // Find and delete the region
    const deletedDriver = await DriverModel.findByIdAndDelete(_id);

    // Check if region was actually found and deleted
    if (!deletedDriver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'driver deleted successfully',
    });

  } catch (error) {
    // Handle any unexpected errors
    console.error('Error deleting driver:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
