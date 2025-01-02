const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a user
router.post('/users', userController.createUser);

// Get all users
router.get('/users', userController.getUsers);

// Get a user by ID
router.get('/users/:id', userController.getUserById);

// Update a user
router.put('/users/:id', userController.updateUser);

// Delete a user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
