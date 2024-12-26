import PushNotification from '../models/pushnotification.model.js'

export const saveNotification = async (req, res) => {
    try {
        // Destructure the notification data from request body
        const {
            customer,
            driver,
            title,
            message,
            schedule,
        } = req.body;
        

        // Validate required fields
        if (!title || !message) {
            return res.status(400).json({
                success: false,
                message: "Title and message are required",
            });
        }
        
        let base64Image = null;
        if (req.files && req.files.image) {
            const imageFile = req.files.image; 
            base64Image = imageFile.data.toString('base64'); 
        }

        let parsedSchedule = null;
        if (schedule) {
            try {
                parsedSchedule = JSON.parse(schedule); // Parse the JSON string
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid schedule format",
                });
            }
        }

        // Create a new notification
        const newNotification = new PushNotification({
            customer,
            driver,
            title,
            message,
            schedule: parsedSchedule,
            image: base64Image, // Save the Base64-encoded image
            status: schedule?.enabled ? 'Scheduled' : 'Draft',
        });

        await newNotification.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "Notification created successfully",
        });

    } catch (error) {
        console.error('Error saving notification:', error);

        // Handle specific mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
            });
        }

        // Generic server error
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await PushNotification.find(); 
        
        return res.status(200).json({
            success: true,
            message: 'notifications fetched successfully',
            data: notifications,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const { _id } = req.body;

        // Validate that ID is provided
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'notification ID is required'
            });
        }

        // Find and delete the region
        const deletednotification = await PushNotification.findByIdAndDelete(_id);

        // Check if region was actually found and deleted
        if (!deletednotification) {
            return res.status(404).json({
                success: false,
                message: 'notification not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'notification deleted successfully',
        });

    } catch (error) {
        // Handle any unexpected errors
        console.error('Error deleting notification:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const updateNotification = async(req,res)=>{
    try {
        const { id } = req.params;

        const existingNotification = await PushNotification.findById(id);
        if (!existingNotification) {
            return res.status(404).json({
                message: "existingNotification not found",
                success: false,
            });
        }

        // Update the service
        const updatedNotification = await PushNotification.findByIdAndUpdate(
            id,
            {
                status:'Sent',
                initiated:true,
            },
            { 
                new: true,  // Return the updated document
                runValidators: true  // Run model validations
            }
        );

        // Respond with the updated service
        return res.status(200).json({
            message: "Notification Initiated successfully",
            success: true,
        });

    } catch (error) {
        console.error('Error updating Notification:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
    
}