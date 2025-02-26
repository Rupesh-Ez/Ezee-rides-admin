import PushNotification from '../models/pushnotification.model.js'
import axios from 'axios'
import cron from 'node-cron'

const activeCronJobs = {};

const sendPushNotification = async (existingNotification) => {
    const apiKeyDriver = 'os_v2_app_2btlernccfblvabccvqmqw6etje5vxr6dpnedk5px35qh4do4pvgbztc3gntq6pmoymmwh6jneqvatabigyhivus6qnjkasa6esxnoi';
    const apiKeyUser = 'os_v2_app_7y477ckko5hx3h2ouhdvtuwgsh2g4ucm2jpeu2vt5nue3do4tkl7evkpkjnubrwatlj46h6jyg4rvilcrzviqf5nnj5mkjcugbgfo3a';

    try {
        const payloadDriver = {
            app_id: 'd066b245-a211-42ba-8022-1560c85bc49a',
            included_segments: ['All'],
            contents: { en: existingNotification.message || "Ezee Rider" },
            headings: { en: existingNotification.title || "Notification" },
            data: {
                notification_id: existingNotification._id,
                type: "general"
            },
            big_picture: existingNotification.image
                ? existingNotification.image.replace(/\/file\/d\/(.*?)\/view.*/, '/uc?export=view&id=$1')
                : undefined,


            large_icon: 'https://drive.google.com/file/d/1lSKsJPSScCNE9KKXUiGBGH37lKHv9ACX/view?usp=sharing'.replace(/\/file\/d\/(.*?)\/view.*/, '/uc?export=view&id=$1')
        };

        const payloadUser = {
            app_id: 'fe39ff89-4a77-4f7d-9f4e-a1c759d2c691',
            included_segments: ['All'],
            contents: { en: existingNotification.message || "Ezee Rider" },
            headings: { en: existingNotification.title || "Notification" },
            data: {
                notification_id: existingNotification._id,
                type: "general"
            },
            big_picture: existingNotification.image
                ? existingNotification.image.replace(/\/file\/d\/(.*?)\/view.*/, '/uc?export=view&id=$1')
                : undefined,


            large_icon: 'https://drive.google.com/file/d/1iAE3RWyz78xxP4qiqNauvw9PXQ3I-G8y/view?usp=drive_link'.replace(/\/file\/d\/(.*?)\/view.*/, '/uc?export=view&id=$1')
        };
        if (existingNotification.customer === true) {
            await axios.post('https://onesignal.com/api/v1/notifications', payloadUser, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${apiKeyUser}`
                }
            });

        }
        if (existingNotification.driver === true) {
            await axios.post('https://onesignal.com/api/v1/notifications', payloadDriver, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${apiKeyDriver}`
                }
            });

        }

    } catch (axiosError) {
        console.error('OneSignal API Error:',
            axiosError.response ? axiosError.response.data : axiosError.message
        );
    }
}

const getCronExpression = (date, time, frequency) => {
    const [hour, minute] = time.split(':').map(Number);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // 1-based index
    const dayOfWeek = date.getUTCDay(); // 0 (Sunday) - 6 (Saturday)

    switch (frequency.toLowerCase()) {
        case 'once':
            return `${minute} ${hour} ${day} ${month} *`;
        case 'daily':
            return `${minute} ${hour} * * *`;
        case 'weekly':
            return `${minute} ${hour} * * ${dayOfWeek}`;
        case 'monthly':
            return `${minute} ${hour} ${day} * *`;
        default:
            throw new Error('Invalid frequency');
    }
};

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
            image: image,
            status: schedule?.enabled ? 'Scheduled' : 'Draft',
        });

        const notification = await newNotification.save();

        if (notification.schedule.enabled) {
            const { date, time, frequency } = notification.schedule.details;
            const scheduledDate = new Date(date);

            const cronExpression = getCronExpression(scheduledDate, time, frequency);

            const task = cron.schedule(cronExpression, async () => {
                const now = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
                const scheduledDateTime = new Date(
                    `${scheduledDate.toISOString().split('T')[0]}T${time}:00Z`
                );

                if (now >= scheduledDateTime) {
                    await sendPushNotification(notification);
                }
            });

            if (frequency === "once") {
                task.stop();
            }
            else {
                // console.log("task is -> ",task);
                activeCronJobs[notification._id] = task;
            }

        }
        // console.log("Active corn jobs -> ",activeCronJobs);
        
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
        const notifications = await PushNotification.find({}).sort({ createdAt: -1 });

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

        if (activeCronJobs[_id]) {
            activeCronJobs[_id].stop();
            delete activeCronJobs[_id];
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
        await PushNotification.findByIdAndUpdate(
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

        // Ensure apiKey is correctly defined
        const apiKeyDriver = 'os_v2_app_2btlernccfblvabccvqmqw6etje5vxr6dpnedk5px35qh4do4pvgbztc3gntq6pmoymmwh6jneqvatabigyhivus6qnjkasa6esxnoi';
        const apiKeyUser = 'os_v2_app_7y477ckko5hx3h2ouhdvtuwgsh2g4ucm2jpeu2vt5nue3do4tkl7evkpkjnubrwatlj46h6jyg4rvilcrzviqf5nnj5mkjcugbgfo3a';

        try {
            const payloadDriver = {
                app_id: 'd066b245-a211-42ba-8022-1560c85bc49a',
                included_segments: ['All'],
                contents: { en: existingNotification.message || "Ezee Rider" },
                headings: { en: existingNotification.title || "Notification" },
                data: {
                    notification_id: id,
                    type: "general"
                },
                big_picture: existingNotification.image
                    ? existingNotification.image.replace(/\/file\/d\/(.*?)\/view.*/, '/uc?export=view&id=$1')
                    : undefined,


                large_icon: 'https://drive.google.com/file/d/1lSKsJPSScCNE9KKXUiGBGH37lKHv9ACX/view?usp=sharing'.replace(/\/file\/d\/(.*?)\/view.*/, '/uc?export=view&id=$1')
            };

            const payloadUser = {
                app_id: 'fe39ff89-4a77-4f7d-9f4e-a1c759d2c691',
                included_segments: ['All'],
                contents: { en: existingNotification.message || "Ezee Rider" },
                headings: { en: existingNotification.title || "Notification" },
                data: {
                    notification_id: id,
                    type: "general"
                },
                big_picture: existingNotification.image
                    ? existingNotification.image.replace(/\/file\/d\/(.*?)\/view.*/, '/uc?export=view&id=$1')
                    : undefined,


                large_icon: 'https://drive.google.com/file/d/1iAE3RWyz78xxP4qiqNauvw9PXQ3I-G8y/view?usp=drive_link'.replace(/\/file\/d\/(.*?)\/view.*/, '/uc?export=view&id=$1')
            };
            if (existingNotification.customer === true) {
                await axios.post('https://onesignal.com/api/v1/notifications', payloadUser, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${apiKeyUser}`
                    }
                });

            }
            if (existingNotification.driver === true) {
                await axios.post('https://onesignal.com/api/v1/notifications', payloadDriver, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${apiKeyDriver}`
                    }
                });

            }

            return res.status(200).json({
                message: "Notification Initiated successfully",
                success: true,
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