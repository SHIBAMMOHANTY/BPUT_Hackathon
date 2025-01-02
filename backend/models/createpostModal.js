const mongoose = require('mongoose');

const createpostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
      },
    title: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
        required: true,
    },
    media: {
        type: String, 
        required: true,
    },
    mediaType: {
        type: String, 
        enum: ['image', 'video'],
        required: true,
    },
    requiredAmount: {
        type: Number,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    likes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Array of users who liked the post
        }],
        default: [], // Default is an empty array
    },
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // User who made the comment
            required: true,
        },
        content: {
            type: String,
            required: true, // Content of the comment
        },
        createdAt: {
            type: Date,
            default: Date.now, // Timestamp of the comment
        },
    }],
    donations: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // User who made the donation
            required: true,
        },
        amount: {
            type: Number,
            required: true, // Amount of the donation
        },
        createdAt: {
            type: Date,
            default: Date.now, // Timestamp of the donation
        },
    }],
    postedAt: {
        type: Date,
        default: Date.now,
    },
})
const CreatePost = mongoose.model('CreatePost', createpostSchema);
module.exports = CreatePost;