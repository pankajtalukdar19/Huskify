const express = require('express');
const route = express.Router();
const transactionController = require('../controllers/transactions.controller');

route.post('/', transactionController.create);
route.get('/' , transactionController.getAll);



module.exports = route;