// controllers/projectsController.js
const Project = require('../models/Project');  // Correctly reference the Project model

// Example function to get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Example function to create a project
const createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

module.exports = { getAllProjects, createProject };
