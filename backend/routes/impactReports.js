const express = require('express');
const router = express.Router();
const {
    getImpactReports,
    createImpactReport,
    updateImpactReport,
    deleteImpactReport,
} = require('../controllers/impactReportsController');

router.get('/', getImpactReports); // Get all impact reports
router.post('/', createImpactReport); // Create a new impact report
router.put('/:id', updateImpactReport); // Update an impact report by ID
router.delete('/:id', deleteImpactReport); // Delete an impact report by ID

module.exports = router;
