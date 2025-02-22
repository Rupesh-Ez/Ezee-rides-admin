import { Region } from '../models/region.model.js';

export const saveRegion = async (req, res) => {
  try {
    const { city, distance, timezone, status, coordinates } = req.body;
    if (!city || !distance || !timezone || !status || !coordinates) {
      return res.status(400).json({
        message: "something is missing",
        success: false
      })
    }

    const areCoordinatesValid = coordinates.every(coord =>
      coord.lat !== undefined &&
      coord.lng !== undefined &&
      typeof coord.lat === 'number' &&
      typeof coord.lng === 'number'
    );

    if (!areCoordinatesValid) {
      return res.status(400).json({
        message: "Invalid coordinates format. Ensure all coordinates have valid lat and lng values.",
        success: false
      });
    }

    await Region.create({
      city,
      distance, // Match the MongoDB schema field name
      timezone,     // Match the MongoDB schema field name
      status,
      coordinates
    });
    return res.status(201).json({
      message: "created region successfully",
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });

  }
}

export const getAllRegions = async (req, res) => {
  try {
    const regions = await Region.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: 'Regions fetched successfully',
      data: regions,
    });
  } catch (error) {
    console.error('Error fetching regions:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const deleteRegion = async (req, res) => {
  try {
    const { _id } = req.body;

    // Validate that ID is provided
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: 'Region ID is required'
      });
    }

    // Find and delete the region
    const deletedRegion = await Region.findByIdAndDelete(_id);

    // Check if region was actually found and deleted
    if (!deletedRegion) {
      return res.status(404).json({
        success: false,
        message: 'Region not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Region deleted successfully',
      deletedRegion: deletedRegion
    });

  } catch (error) {
    // Handle any unexpected errors
    console.error('Error deleting region:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const updateRegion = async (req, res) => {
  try {

    const { id } = req.params;
    const { Status } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Region ID and active status are required',
      });
    }
    const status = (Status) ? "Active" : "inactive";
    // Find and update the region
    const updatedRegion = await Region.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    // Check if region was actually found and updated
    if (!updatedRegion) {
      return res.status(404).json({
        success: false,
        message: 'Region not found',
      });
    }

    // Respond with the updated region
    res.status(200).json({
      success: true,
      message: 'Region status updated successfully',
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error updating region status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
}

export const getRegioncity = async (req, res) => {
  try {
    const regions = await Region.find({}, { city: 1 });
    return res.status(200).json({
      success: true,
      data: regions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch regions',
      error: error.message,
    });
  }
}

export const getRegionById = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: 'Region ID required',
      });
    }

    const regionById = await Region.findById(_id)
      .select('-__v')
      .lean();

    // Check if service exists
    if (!regionById) {
      return res.status(404).json({
        success: false,
        message: 'Region not found',
      });
    }

    // Return the service details
    return res.status(200).json({
      success: true,
      data: regionById,
      message: 'Region retrieved successfully',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
}

export const updateRegionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { city, distance, timezone, status, coordinates } = req.body;
    if (!city || !distance || !timezone || !status || !coordinates) {
      return res.status(400).json({
        message: "something is missing",
        success: false
      })
    }

    const areCoordinatesValid = coordinates.every(coord =>
      coord.lat !== undefined &&
      coord.lng !== undefined &&
      typeof coord.lat === 'number' &&
      typeof coord.lng === 'number'
    );

    if (!areCoordinatesValid) {
      return res.status(400).json({
        message: "Invalid coordinates format. Ensure all coordinates have valid lat and lng values.",
        success: false
      });
    } 
    
    const existingRegion = await Region.findById(id);
    if (!existingRegion) {
      return res.status(404).json({
        message: "Service not found",
        success: false,
      });
    }

    // Update the service
    await Region.findByIdAndUpdate(
      id,
      {
        city, distance, timezone, status, coordinates
      },
      {
        new: true,  // Return the updated document
        runValidators: true  // Run model validations
      }
    );

    // Respond with the updated service
    return res.status(200).json({
      message: "Region updated successfully",
      success: true,
    });

  } catch (error) {
    console.error('Error updating Region:', error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }

}