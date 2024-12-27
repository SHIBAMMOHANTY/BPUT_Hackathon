// models/Project.js
const mongoose = require('mongoose');

// Define the project schema
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['In Progress', 'Completed', 'Pending'],
        default: 'In Progress',
    },
    // Add other fields as per your requirements
});

// Create the model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
