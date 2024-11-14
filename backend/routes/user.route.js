const express = require('express');
const route = express.Router();
const userController = require('../controllers/user.controller');

route.post('/', userController.create);
route.get('/' , userController.getAll);
route.get('/:id' , userController.getUserById);
route.get('/getvendorByAddress/:id' , userController.getVendorByAddressId);



module.exports = route;