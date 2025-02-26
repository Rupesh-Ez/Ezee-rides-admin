import mongoose from "mongoose";
import {io} from 'socket.io-client'

const socket = io('http://145.223.23.193:3000', {
  transports: ['websocket'],
  reconnection: true,
});

let OnlineDrivers = [];

socket.on('driveronline', (driverData) => {
  // console.log('Driver online:', driverData);
  if (!OnlineDrivers.find((d) => d.phno === driverData.phno)) {
    OnlineDrivers.push(driverData);
  }
});

socket.on('driveroffline', (driverData) => {
  // console.log('Driver offline:', driverData);
  if(driverData.phno!=null){
    OnlineDrivers = OnlineDrivers.filter((d) => d.phno !== driverData.phno);
  }
});

const driverSchema = new mongoose.Schema({}, { strict: false });
const DriverModel = mongoose.model('Driver', driverSchema, 'Drivers');

const fileSchema = new mongoose.Schema({}, { strict: false });
const FileModel = mongoose.model('Files', fileSchema, 'Files');

export const getOnlineDrivers = async (req,res) =>{
  try {
    return res.status(200).json({
      success: true,
      message: 'drivers fetched successfully',
      data: OnlineDrivers,
    });
  } catch (error) {
    console.log(error);
    
  }
}

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
    
    const {
      ACvalidate,
      PANvalidate,
      DLvalidate,
      DLrejected,
      RCvalidate,
      RCrejected,
      Vehiclevalidate,
      Vehiclerejected,
      Identityvalidate,
      Identityrejected,
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
      ifscCode,
      filesObjestIds
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Driver ID is required",
      });
    }

    // Find the driver first
    const driver = await DriverModel.findOne({ phonenumber: id });
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    // Create a new files array by filtering out rejected documents
    let updatedFiles = driver.files.filter(fileObj => {
      const fileKey = Object.keys(fileObj)[0];
      
      if ((DLrejected || Vehiclerejected) && (fileKey === 'DL Upload Back' || fileKey === 'DL Upload Front' || fileKey === 'Upload License Plate')) {
        return false;
      }
      if (RCrejected && (fileKey === 'RC Upload Back' || fileKey === 'RC Upload Front')) {
        return false;
      }
      
      if (Identityrejected && (
        fileKey === 'Aadhaar Upload Front' || 
        fileKey === 'Aadhaar Upload Back' || 
        fileKey === 'Pan Card Upload Front'
      )) {
        return false;
      }
      return true;
    });

    // Delete the actual files from FileModel if needed
    if (DLrejected || Vehiclerejected) {
      await FileModel.findByIdAndDelete(filesObjestIds['DL Upload Back']);
      await FileModel.findByIdAndDelete(filesObjestIds['DL Upload Front']);
      await FileModel.findByIdAndDelete(filesObjestIds['Upload License Plate']);
    }
    if (RCrejected) {
      await FileModel.findByIdAndDelete(filesObjestIds['RC Upload Back']);
      await FileModel.findByIdAndDelete(filesObjestIds['RC Upload Front']);
    }
    if (Identityrejected) {
      await FileModel.findByIdAndDelete(filesObjestIds['Aadhaar Upload Front']);
      await FileModel.findByIdAndDelete(filesObjestIds['Aadhaar Upload Back']);
      await FileModel.findByIdAndDelete(filesObjestIds['Pan Card Upload Front']);
    }

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
      ACvalidate: !!Identityvalidate,
      PANvalidate: !!Identityvalidate,
      DLvalidate: !!(DLvalidate && Vehiclevalidate),
      DLrejected: !(DLvalidate && Vehiclevalidate),
      RCvalidate: !!RCvalidate,
      RCrejected: !!RCrejected,
      Vehiclevalidate: !!(DLvalidate && Vehiclevalidate),
      Vehiclerejected: !(DLvalidate && Vehiclevalidate),
      Identityvalidate: !!Identityvalidate,
      Identityrejected: !!Identityrejected,
      bankaccvalidate: !!bankaccvalidate,
      bankaccrejected: !bankaccvalidate,
      files: updatedFiles // Add the updated files array to the updates
    };

    if (DLvalidate && RCvalidate && Vehiclevalidate && Identityvalidate && bankaccvalidate) {
      updates.profilevalidate = true;
      updates.profilerejected = false;
    } else {
      updates.profilevalidate = false;
      updates.profilerejected = true;
    }

    const updatedDriver = await DriverModel.findOneAndUpdate(
      { phonenumber: id },
      { $set: updates },
      { new: true, runValidators: true }
    );

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

    // Find the driver first to get file IDs
    const driver = await DriverModel.findById(_id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Extract all fileIds from the files array
    const fileIds = driver.files.map(fileObj => {
      // Get the first (and only) key of the object
      const key = Object.keys(fileObj)[0];
      // Return the fileId from the nested object
      return fileObj[key].fileId;
    });

    // Delete all files
    for (const fileId of fileIds) {
      try {
        await FileModel.findByIdAndDelete(fileId);
      } catch (error) {
        console.error(`Error deleting file ${fileId}:`, error);
        // Continue with other deletions even if one fails
      }
    }

    // Delete the driver
    const deletedDriver = await DriverModel.findByIdAndDelete(_id);

    res.status(200).json({
      success: true,
      message: 'Driver and associated files deleted successfully',
      deletedFilesCount: fileIds.length
    });

  } catch (error) {
    console.error('Error deleting driver:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};



export default DriverModel;
