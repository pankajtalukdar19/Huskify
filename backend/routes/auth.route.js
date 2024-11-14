const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { auth } = require('../middleware/auth.middleware')

router.post('/request-otp', authController.requestOtp)
router.post('/verify-otp', authController.verifyOtp)
router.post('/refresh', authController.refreshToken)

module.exports = router
