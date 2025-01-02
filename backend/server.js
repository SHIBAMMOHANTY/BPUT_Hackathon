const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

// Import Routes
const postRoutes = require('./routes/postRoutes');
const socialWorkRoutes = require('./routes/socialWorkRoutes');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connection established!'))
    .catch((err) => console.log('MongoDB connection error: ', err));

// Use Routes
app.use('/api/posts', postRoutes);
app.use('/api/socialworks', socialWorkRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Default Route for Testing
app.get('/', (req, res) => {
    res.send('E-Biza Backend is Running');
});

// Start the Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
