const ImpactReport = require('../models/ImpactReport');

// Get all impact reports
exports.getImpactReports = async (req, res) => {
    try {
        const impactReports = await ImpactReport.find();
        res.status(200).json(impactReports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new impact report
exports.createImpactReport = async (req, res) => {
    try {
        const newImpactReport = new ImpactReport(req.body);
        const savedImpactReport = await newImpactReport.save();
        res.status(201).json(savedImpactReport);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update an impact report by ID
exports.updateImpactReport = async (req, res) => {
    try {
        const updatedImpactReport = await ImpactReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedImpactReport);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete an impact report by ID
exports.deleteImpactReport = async (req, res) => {
    try {
        await ImpactReport.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Impact report deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
