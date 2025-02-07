import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    region: {
        type: String,
        required: true,
        trim: true,
    },
    regionId: {
        type:String,
        required: true,
    },
    baseFare: {
        type: Number,
        required: true,
    },
    nightCharges: {
        type: Number,
        default: 0,
    },
    surgeCharges: {
        type: Number,
        default: 0,
    },
    minimumDistance: {
        type: Number,
        required: true,
    },
    minimumFare: {
        type: Number,
        required: true,
    },
    perDistance: {
        type: Number,
        required: true,
        min: 0,
    },
    perDistanceLarge: {
        type: Number,
        required: false,
        min: 0,
    },
    perMinuteWait: {
        type: Number,
    },
    adminCommission: {
        type: Number,
        required: true,
        min: 0,
    },
    waitingTimeLimit: {
        type: Number,
    },
    commissionType: {
        type: String,
        enum: ['Fixed', 'Percentage'],
        default: 'Fixed',
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Online/UPI', 'Wallet', 'Select All'],
        default: 'Cash',
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Inactive',
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
}, {
    timestamps: true,
});

export const Service = mongoose.model('Service', serviceSchema);