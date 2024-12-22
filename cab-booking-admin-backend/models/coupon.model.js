import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Coupon code is required'],
        unique: true,
        trim: true,
        maxlength: [50, 'Coupon code cannot be more than 50 characters']
    },
    title: {
        type: String,
        required: [true, 'Coupon title is required'],
        trim: true,
        maxlength: [100, 'Coupon title cannot be more than 100 characters']
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    couponType: {
        type: String,
        enum: ['All', 'First', 'Region', 'Service'],
        default: 'All'
    },
    region: {
        type: String,
        trim: true
    },
    service: {
        type: String,
        trim: true
    },
    usageLimit: {
        type: Number,
        min: [0, 'Usage limit cannot be negative'],
        default: 0
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
        validate: {
            validator: function(value) {
                return this.startDate <= value;
            },
            message: 'End date must be after or equal to start date'
        }
    },
    discountType: {
        type: String,
        enum: ['Fixed', 'Percentage'],
        default: 'Fixed'
    },
    discount: {
        type: Number,
        required: [true, 'Discount amount is required'],
        min: [0, 'Discount cannot be negative']
    },
    maxDiscount: {
        type: Number,
        min: [0, 'Maximum discount cannot be negative']
    },
    minimumAmount: {
        type: Number,
        min: [0, 'Minimum amount cannot be negative']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    users:{
        type: Number,
        min:[0,'Minimum users']
    }
}, {
    timestamps: true
});

// Create a compound index to ensure unique coupon codes
couponSchema.index({ code: 1 }, { unique: true });

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;