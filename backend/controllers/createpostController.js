const createpostmodal = require('../models/createpostModal');
const User = require('../models/userModel'); // Assuming you have a user model

// Middleware to check if the user is a business or ngo
const checkRole = (role) => {
    return (req, res, next) => {
        if (!req.user || ![role].flat().includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

exports.createPost = async (req, res) => {
    try {
        const { title, description, media, mediaType, requiredAmount, company, location, salary, role,userId } = req.body;

        // Validate the role input
        if (!role || !['business', 'ngo', 'user'].includes(role)) {
            return res.status(400).json({ message: 'Invalid or missing role' });
        }

        // Check user role for restricted fields
        if (['requiredAmount', 'company', 'salary'].some(field => req.body[field]) && !['business', 'ngo'].includes(role)) {
            return res.status(403).json({ message: 'Access denied to these fields' });
        }

        const newPost = new createpostmodal({
            title,
            description,
            media,
            mediaType,
            location,
            userId,
            ...(role === 'business' || role === 'ngo' ? { requiredAmount, company, salary } : {}),
        });

        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create post', error: err.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await createpostmodal.find().limit(6);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
    }
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await createpostmodal.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch post', error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, description, media, mediaType, requiredAmount, company, location, salary,role } = req.body;

    try {
        const post = await createpostmodal.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check user role for restricted fields
        if (['requiredAmount', 'company', 'salary'].some(field => req.body[field]) && !['business', 'ngo'].includes(role)) {
            return res.status(403).json({ message: 'Access denied to these fields' });
        }

        const updatedPost = await createpostmodal.findByIdAndUpdate(
            id,
            {
                title,
                description,
                media,
                mediaType,
                location,
                role,
                ...(role === 'business' || role === 'ngo' ? { requiredAmount, company, salary } : {}),
            },
            { new: true }
        );

        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update post', error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await createpostmodal.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete post', error: err.message });
    }
};
// Message route

exports.addCommentToPost = async (req, res) => {
    const { postId, userId, content } = req.body;

    // Validate input
    if (!postId || !userId || !content) {
        return res.status(400).json({ message: 'Post ID, User ID, and content are required.' });
    }

    try {
        // Find the post by ID
        const post = await createpostmodal.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Add the new comment
        const newComment = {
            userId,
            content,
            createdAt: new Date(),
        };
        post.comments.push(newComment);

        // Save the updated post
        await post.save();

        res.status(200).json({
            message: 'Comment added successfully.',
            comment: newComment,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add comment.',
            error: error.message,
        });
    }
};

// Like post
exports.likePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await createpostmodal.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user already liked the post
        if (post.likes.includes(req.user._id)) {
            return res.status(400).json({ message: 'You already liked this post' });
        }

        post.likes.push(req.user._id);
        await post.save();

        res.status(200).json({ message: 'Post liked successfully', post });
    } catch (err) {
        res.status(500).json({ message: 'Failed to like post', error: err.message });
    }
};
