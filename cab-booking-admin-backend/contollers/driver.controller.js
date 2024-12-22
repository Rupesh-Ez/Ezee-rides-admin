import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({}, { strict: false });
const DriverModel = mongoose.model('Driver', driverSchema, 'Drivers');

const fileSchema = new mongoose.Schema({}, { strict: false });
const FileModel = mongoose.model('Files', fileSchema, 'Files');

export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await DriverModel.find({});
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
    const { DLvalidate,
      RCvalidate,
      Vehiclevalidate,
      Identityvalidate, } = req.body;

    // Check if driverId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Driver ID is required',
      });
    }

    const updates = {};
    if (DLvalidate ) {updates.DLvalidate = true; updates.DLrejected =false}
    else {updates.DLrejected = true; updates.DLvalidate = false}
    if (RCvalidate) {updates.RCvalidate = true; updates.RCrejected =false}
    else {updates.RCrejected = true; updates.RCvalidate = false}
    if (Vehiclevalidate) {updates.Vehiclevalidate = true; updates.Vehiclerejected =false}
    else {updates.Vehiclerejected = true; updates.Vehiclevalidate = false}
    if (Identityvalidate) {updates.Identityvalidate = true;updates.Identityrejected =false}
    else {updates.Identityrejected = true; updates.Identityvalidate = false}
    if(DLvalidate && RCvalidate && Vehiclevalidate && Identityvalidate) {updates.profilevalidate = true;updates.profilerejected =false}
    else {updates.profilerejected = true; updates.profilevalidate = false}

    // Update the document
    const updatedDriver = await DriverModel.findOneAndUpdate(
      { phonenumber: id }, // Filter
      { $set: updates }, // Updates
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Verification statuses updated successfully',
      data: updatedDriver,
    });
  } catch (err) {
    console.error('Error updating verification statuses:', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating verification statuses',
      error: err.message,
    });
  }
};