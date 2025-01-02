const express = require('express');
const router = express.Router();
const createpostController = require('../controllers/createpostController');

// Create a post
router.post('/createpost', createpostController.createpost);

// Get all posts
router.get('/getallpost', createpostController.getPosts);

// Get a post by ID
router.get('/getpost/:id', createpostController.getPostById);

// Update a post
router.put('/updatepost/:id', createpostController.updatePost);

// Delete a post
router.delete('/deletepost/:id', createpostController.deletePost);



module.exports = router;