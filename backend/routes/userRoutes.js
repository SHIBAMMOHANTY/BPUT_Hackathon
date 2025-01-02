const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a user
router.post('/create', userController.createUser);

// Get all users
router.get('/getuser', userController.getUsers);

// Get a user by ID
router.get('/getuser/:id', userController.getUserById);

// Update a user
router.put('/updateuser/:id', userController.updateUser);

// Delete a user
router.delete('/delete/:id', userController.deleteUser);

//login a user
router.post('/login', userController.loginUser);

module.exports = router;
