import PushNotification from '../models/pushnotification.model.js'
import axios from 'axios'

export const saveNotification = async (req, res) => {
    try {
        // Destructure the notification data from request body
        const {
            customer,
            driver,
            title,
            message,
            schedule,
            image,
        } = req.body;


        // Validate required fields
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title and message are required",
            });
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
            image: image, // Save the Base64-encoded image
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

export const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const existingNotification = await PushNotification.findById(id);
        if (!existingNotification) {
            return res.status(404).json({
                message: "Existing notification not found",
                success: false,
            });
        }

        // Update the service
        const updatedNotification = await PushNotification.findByIdAndUpdate(
            id,
            {
                status: 'Sent',
                initiated: true,
            },
            {
                new: true,
                runValidators: true
            }
        );
        console.log(existingNotification.image);

        // Ensure apiKey is correctly defined
        const apiKey = 'os_v2_app_2gmkvjaa4jg53glbcw6jtpbvksarupha765u2c4gbzxqowwakkfwmliy5dhmjpi2l3yiyk7q7z5f7fpyfve5k6nphbuhnyyl7b62rei';
        if (!apiKey) {
            return res.status(500).json({
                message: "OneSignal API Key not configured",
                success: false,
            });
        }

        const payload = {
            app_id: 'd198aaa4-00e2-4ddd-9961-15bc99bc3554',
            included_segments: ['All'],
            contents: { en: existingNotification.message || "Default message" },
            headings: { en: existingNotification.title || "Notification" },
            data: {
                notification_id: id,
                type: "general"
            },
            big_picture: existingNotification.image
                ? existingNotification.image.replace(/\/file\/d\/(.*?)\/view.*/, '/uc?export=view&id=$1')
                : undefined,


            // large_icon: 'https://images.unsplash.com/photo-1531666692006-da240046a095?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        };

        try {
            const response = await axios.post('https://onesignal.com/api/v1/notifications', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${apiKey}`
                }
            });

            return res.status(200).json({
                message: "Notification Initiated successfully",
                success: true,
                responseData: response.data
            });

        } catch (axiosError) {
            console.error('OneSignal API Error:',
                axiosError.response ? axiosError.response.data : axiosError.message
            );

            return res.status(500).json({
                message: "Failed to send OneSignal notification",
                success: false,
                error: axiosError.response ? axiosError.response.data : axiosError.message
            });
        }

    } catch (error) {
        console.error('Error updating Notification:', error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}