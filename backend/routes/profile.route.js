const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const { auth } = require('../middleware/auth.middleware');

// All profile routes require authentication
router.use(auth);

// Get user profile
router.get('/', profileController.getProfile);

// Update user profile
router.patch('/', profileController.updateProfile);

module.exports = router;
