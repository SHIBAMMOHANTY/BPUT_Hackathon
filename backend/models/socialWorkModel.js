const mongoose = require('mongoose');

const socialWorkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    media: {
        type: String, // Store the URL to the media (image/video)
        required: true,
    },
    ngoTag: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SocialWork = mongoose.model('SocialWork', socialWorkSchema);

module.exports = SocialWork;
