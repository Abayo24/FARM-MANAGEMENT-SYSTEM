import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    variety: {
        type: String,
        required: true
    },
    plantingDate: {
        type: Date,
        required: true
    },
    expectedHarvestDate: {
        type: Date,
        required: true
    },
    currentStatus: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Crop = mongoose.model('Crop', cropSchema);

export default Crop;