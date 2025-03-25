import Activity from '../models/activity.model.js';
import mongoose from 'mongoose';

export const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find().populate('crop');
        res.status(200).json({ success: true, data: activities });
    } catch (error) {
        console.error('Error fetching activities:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createActivity = async (req, res) => {
    const { description, date, crop } = req.body;

    if (!description || !date || !crop) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    try {
        const newActivity = new Activity({ description, date, crop });
        await newActivity.save();
        res.status(201).json({ success: true, data: newActivity });
    } catch (error) {
        console.error('Error creating activity:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateActivity = async (req, res) => {
    const { id } = req.params;
    const { description, date, crop } = req.body;

    if (!description || !date || !crop) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    try {
        const updatedActivity = await Activity.findByIdAndUpdate(
            id,
            { description, date, crop: crop._id || crop }, // Ensure crop is stored as an ID
            { new: true }
        ).populate('crop'); // Populate the crop field to return the full object

        if (!updatedActivity) {
            return res.status(404).json({ success: false, message: 'Activity not found' });
        }

        res.status(200).json({ success: true, data: updatedActivity });
    } catch (error) {
        console.error('Error updating activity:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteActivity = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid activity ID' });
    }

    try {
        await Activity.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Activity deleted successfully' });
    } catch (error) {
        console.error('Error deleting activity:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};