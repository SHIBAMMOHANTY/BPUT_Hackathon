const Job = require('../models/jobModel');

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const { title, description, salary, companyName } = req.body;
        const newJob = new Job({ title, description, salary, companyName });
        await newJob.save();
        res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create job', error: err.message });
    }
};

// Get all jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
    }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch job', error: err.message });
    }
};

// Update a job
exports.updateJob = async (req, res) => {
    const { id } = req.params;
    const { title, description, salary, companyName } = req.body;
    try {
        const updatedJob = await Job.findByIdAndUpdate(id, { title, description, salary, companyName }, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update job', error: err.message });
    }
};

// Delete a job
exports.deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedJob = await Job.findByIdAndDelete(id);
        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete job', error: err.message });
    }
};
