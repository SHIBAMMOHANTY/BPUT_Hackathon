const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Create a post
router.post('/', postController.createPost);

// Get all posts
router.get('/', postController.getPosts);

// Get a post by ID
router.get('/:id', postController.getPostById);

// Update a post
router.put('/:id', postController.updatePost);

// Delete a post
router.delete('/:id', postController.deletePost);

module.exports = router;
