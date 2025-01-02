const Post = require('../models/postModel');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { title, content, imageUrl } = req.body;
        const newPost = new Post({ title, content, imageUrl });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create post', error: err.message });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
    }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch post', error: err.message });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, imageUrl } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { title, content, imageUrl }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update post', error: err.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete post', error: err.message });
    }
};
