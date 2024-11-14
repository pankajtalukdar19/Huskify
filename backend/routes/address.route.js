const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');
const { auth } = require('../middleware/auth.middleware');

router.use(auth); // All address routes require authentication

router.get('/', addressController.getAddresses);
router.post('/', addressController.addAddress);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);
router.patch('/:id/default', addressController.setDefaultAddress);

module.exports = router;
