const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Create a job
router.post('/jobs', jobController.createJob);

// Get all jobs
router.get('/jobs', jobController.getJobs);

// Get a job by ID
router.get('/jobs/:id', jobController.getJobById);

// Update a job
router.put('/jobs/:id', jobController.updateJob);

// Delete a job
router.delete('/jobs/:id', jobController.deleteJob);

module.exports = router;
