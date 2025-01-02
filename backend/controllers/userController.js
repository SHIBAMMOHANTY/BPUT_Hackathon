const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { fullname, email, password,role,disabilityType } = req.body;
        const newUser = new User({ fullname, email, password,role,disabilityType });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create user', error: err.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users', error: err.message });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user', error: err.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    const { id } = req.params; // Extract the user ID from the request parameters
    const { fullname, phone, email, password, disabilityType } = req.body; // Extract fields from the request body

    try {
        // Find the user by ID and update it
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { fullname, phone, email, password, disabilityType },
            { new: true, runValidators: true } // `new` returns the updated document; `runValidators` ensures schema validation
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user', error: err.message });
    }
};


// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete user', error: err.message });
    }
};


// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isPasswordValid = password===user.password;
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Payload
            process.env.JWT_SECRET, // Secret key (store securely in `.env`)
            { expiresIn: '8h' } // Token expiration time
        );

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                disabilityType: user.disabilityType
            },
            token
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to login', error: err.message });
    }
};
