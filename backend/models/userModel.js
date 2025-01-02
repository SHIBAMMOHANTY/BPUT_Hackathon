const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
      
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
 
    password: {
        type: String,
        required: true,
    },
  
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ['user', 'business', 'ngo'], 
        default: 'user',                
    },
    disabilityType: {
        type: String,
        default: 'none',
        enum: ['none', 'physical', 'hearing', 'visual', 'speech', 'cognitive', 'psychological'],
    },
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CreatePost', // Posts where the user made donations
    }],
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CreatePost', // Posts the user liked
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
