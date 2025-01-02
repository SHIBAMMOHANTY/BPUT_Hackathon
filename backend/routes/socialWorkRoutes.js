const express = require('express');
const router = express.Router();
const socialWorkController = require('../controllers/socialWorkController');

// Create a social work
router.post('/social-works', socialWorkController.createSocialWork);

// Get all social works
router.get('/social-works', socialWorkController.getSocialWorks);

// Get a social work by ID
router.get('/social-works/:id', socialWorkController.getSocialWorkById);

// Update a social work
router.put('/social-works/:id', socialWorkController.updateSocialWork);

// Delete a social work
router.delete('/social-works/:id', socialWorkController.deleteSocialWork);

module.exports = router;
