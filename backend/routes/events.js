const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventsController');

router.get('/', getEvents); // Get all events
router.post('/', createEvent); // Create a new event
router.put('/:id', updateEvent); // Update an event by ID
router.delete('/:id', deleteEvent); // Delete an event by ID

module.exports = router;
