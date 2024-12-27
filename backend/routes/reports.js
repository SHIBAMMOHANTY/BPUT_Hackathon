const express = require('express');
const router = express.Router();
const {
    getReports,
    createReport,
    updateReport,
    deleteReport,
} = require('../controllers/reportsController');

router.get('/', getReports); // Get all reports
router.post('/', createReport); // Create a new report
router.put('/:id', updateReport); // Update a report by ID
router.delete('/:id', deleteReport); // Delete a report by ID

module.exports = router;
