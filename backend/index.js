const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

dotenv.config();
connectDB();  // Connect to MongoDB

const app = express();
app.use(cors({
    origin: '*', // Allow all origins for testing
    methods: 'GET,POST', // Allow specific methods
  }));
app.use(express.json()); // For parsing JSON

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/impactReports', require('./routes/impactReports'));
app.use('/api/events', require('./routes/events'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
