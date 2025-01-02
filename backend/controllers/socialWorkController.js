const SocialWork = require('../models/socialWorkModel');

// Create a new social work
exports.createSocialWork = async (req, res) => {
    try {
        const { title, description, ngoName, mediaLink } = req.body;
        const newSocialWork = new SocialWork({ title, description, ngoName, mediaLink });
        await newSocialWork.save();
        res.status(201).json({ message: 'Social Work created successfully', socialWork: newSocialWork });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create social work', error: err.message });
    }
};

// Get all social works
exports.getSocialWorks = async (req, res) => {
    try {
        const socialWorks = await SocialWork.find();
        res.status(200).json(socialWorks);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch social works', error: err.message });
    }
};

// Get a single social work by ID
exports.getSocialWorkById = async (req, res) => {
    const { id } = req.params;
    try {
        const socialWork = await SocialWork.findById(id);
        if (!socialWork) {
            return res.status(404).json({ message: 'Social work not found' });
        }
        res.status(200).json(socialWork);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch social work', error: err.message });
    }
};

// Update a social work
exports.updateSocialWork = async (req, res) => {
    const { id } = req.params;
    const { title, description, ngoName, mediaLink } = req.body;
    try {
        const updatedSocialWork = await SocialWork.findByIdAndUpdate(id, { title, description, ngoName, mediaLink }, { new: true });
        if (!updatedSocialWork) {
            return res.status(404).json({ message: 'Social work not found' });
        }
        res.status(200).json({ message: 'Social work updated successfully', socialWork: updatedSocialWork });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update social work', error: err.message });
    }
};

// Delete a social work
exports.deleteSocialWork = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSocialWork = await SocialWork.findByIdAndDelete(id);
        if (!deletedSocialWork) {
            return res.status(404).json({ message: 'Social work not found' });
        }
        res.status(200).json({ message: 'Social work deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete social work', error: err.message });
    }
};
