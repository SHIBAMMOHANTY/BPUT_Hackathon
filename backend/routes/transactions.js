const express = require('express');
const router = express.Router();
const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionsController');

router.get('/', getTransactions); // Get all transactions
router.post('/', createTransaction); // Create a new transaction
router.put('/:id', updateTransaction); // Update a transaction by ID
router.delete('/:id', deleteTransaction); // Delete a transaction by ID

module.exports = router;
