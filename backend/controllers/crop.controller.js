import Crop from '../models/crop.model.js';
import mongoose from 'mongoose';

export const getCrops = async (req, res) => {
    try {
        const crops = await Crop.find();
        res.status(200).json({ success: true, data: crops });
    } catch (error) {
        console.error('Error in fetching crops:', error.message);
        res.status(500).json({ success: false, message: 'server error' });
    }
};

export const createCrop = async (req, res) => {
    const crop = req.body;

    if(!crop.name || !crop.variety || !crop.plantingDate || !crop.expectedHarvestDate || !crop.currentStatus) {
        return res.status(400).json({ success:false, message: 'Please provide all required fields' });
    }

    const newCrop = new Crop(crop);

    try {
        await newCrop.save();
        res.status(201).json({ success: true, data: newCrop });
    } catch (error) {
        console.error('Error in creating crop:', error.message);
        res.status(500).json({ success: false, message: 'server error' });
    }
};

export const updateCrop = async (req, res) => {
    const { id } = req.params;
    const crop = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:'Invalid crop id'});
    }

    try {
        const updatedCrop = await Crop.findByIdAndUpdate(id, crop, { new: true });
        res.status(200).json({ success: true, data: updatedCrop });
    } catch (error) {
        console.error('Error in updating crop:', error.message);
        res.status(500).json({ success: false, message: 'server error' });
    }
};

export const deleteCrop = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:'Invalid crop id'});
    }

    try {
        await Crop.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Crop deleted successfully' });
        } catch (error) {
            console.error('Error in deleting crop:', error.message);
            res.status(500).json({ success: false, message: 'Servre error' });
        }
}