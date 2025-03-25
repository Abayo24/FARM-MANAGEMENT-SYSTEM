import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    crop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop',
        required: true,
    },
}, {
    timestamps: true,
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;