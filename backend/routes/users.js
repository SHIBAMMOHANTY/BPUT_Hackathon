const express = require('express');
const router = express.Router();
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
} = require('../controllers/usersController');

router.get('/', getUsers); // Get all users
router.post('/login', loginUser)
router.post('/create', createUser); // Create a new user
router.put('/:id', updateUser); // Update a user by ID
router.delete('/:id', deleteUser); // Delete a user by ID

module.exports = router;
