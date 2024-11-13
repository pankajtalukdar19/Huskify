const express = require('express');
const route = express.Router();
const customerController = require('../controllers/customer.controller');

route.post('/', customerController.create);
route.get('/' , customerController.getAll);
route.get('/:id' , customerController.getCustomerById);



module.exports = route;