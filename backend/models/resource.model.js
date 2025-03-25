import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;