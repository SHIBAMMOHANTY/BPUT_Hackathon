const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['INVESTER', 'NGO', 'BUSINESS OWNER'],
        required: true
    },
   
    disabilityType: {
        type: String, // Store disability type selected by Business Owner
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
