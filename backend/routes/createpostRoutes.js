const express = require('express');
const router = express.Router();
const createpostController = require('../controllers/createpostController');
// const {checkRole } = require('../middleware/authonticate');

// Create a post
router.post('/posts',createpostController.createPost);
router.get('/posts',  createpostController.getPosts);
router.get('/posts/:id',  createpostController.getPostById);
router.put('/posts/:id',createpostController.updatePost);
    //   checkRole(['business', 'ngo']),
router.delete('/posts/:id',  createpostController.deletePost);
router.post('/posts/:id/like',  createpostController.likePost);
router.post('/messages',  createpostController.sendMessage);



module.exports = router;