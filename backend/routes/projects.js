// routes/projects.js
const express = require('express');
const router = express.Router();

// Controller functions to be used here
const { getAllProjects, createProject } = require('../controllers/projectsController');

// Routes
router.get('/', getAllProjects);  // Example route to get all projects
router.post('/', createProject);  // Example route to create a new project

module.exports = router;
