const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const { auth } = require('../middleware/auth.middleware');

router.use(auth);

router.get('/user/:userId', transactionController.getUserTransactions);

module.exports = router;
