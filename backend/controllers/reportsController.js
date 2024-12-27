const Report = require('../models/Report');

// Get all reports
exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new report
exports.createReport = async (req, res) => {
    try {
        const newReport = new Report(req.body);
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a report by ID
exports.updateReport = async (req, res) => {
    try {
        const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedReport);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a report by ID
exports.deleteReport = async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
