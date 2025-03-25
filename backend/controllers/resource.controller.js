import Resource from '../models/resource.model.js';
import mongoose from 'mongoose';

export const getResources = async (req, res) => {
    try {
        const resources = await Resource.find();
        res.status(200).json({ success: true, data: resources });
    } catch (error) {
        console.error('Error in fetching resources:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createResource = async (req, res) => {
    const resource = req.body;

    if (!resource.name || !resource.quantity || !resource.type) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const newResource = new Resource(resource);

    try {
        await newResource.save();
        res.status(201).json({ success: true, data: newResource });
    } catch (error) {
        console.error('Error in creating resource:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateResource = async (req, res) => {
    const { id } = req.params;
    const resource = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid resource ID' });
    }

    try {
        const updatedResource = await Resource.findByIdAndUpdate(id, resource, { new: true });
        res.status(200).json({ success: true, data: updatedResource });
    } catch (error) {
        console.error('Error in updating resource:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteResource = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid resource ID' });
    }

    try {
        await Resource.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Resource deleted successfully' });
    } catch (error) {
        console.error('Error in deleting resource:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};