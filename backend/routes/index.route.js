const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.route')
const addressRoutes = require('./address.route')
const profileRoutes = require('./profile.route')
const userRoutes = require('./user.route')


router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/address', addressRoutes)
router.use('/profile', profileRoutes)

module.exports = router
