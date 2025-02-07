import mongoose from 'mongoose';

const PushNotificationSchema = new mongoose.Schema({
    initiated:{
        type:Boolean,
        default:false
    },
    customer: {
        type: Boolean,
        default: false
    },
    driver: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: false
    },
    image:{
        type:String,
        default:null
    },
    schedule: {
        enabled: {
            type: Boolean,
            default: false
        },
        details: {
            date: {
                type: Date,
                default: null
            },
            time: {
                type: String,
                match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // HH:MM format
                default: ''
            },
            frequency: {
                type: String,
                enum: ['', 'Once', 'Daily', 'Weekly', 'Monthly'],
                default: ''
            }
        }
    },
    status: {
        type: String,
        enum: ['Draft', 'Scheduled', 'Sent'],
        default: 'Draft'
    }
}, { 
    timestamps: true 
});

const PushNotification = mongoose.model('PushNotification', PushNotificationSchema);

export default PushNotification;