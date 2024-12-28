const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.loginUser = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        
        // If user is not found
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the entered password with the stored password (plaintext)
        if (req.body.password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const payload = {
            userId: user._id,
            email: user.email,
            role: user.role, // Optional: Include the user's role in the token if needed
        };

        // Sign the token with a secret key and set expiration time (e.g., 1 hour)
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        // Send the token in the response
        res.status(200).json({
            message: 'Login successful',
            token: token,
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
