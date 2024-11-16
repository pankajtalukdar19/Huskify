const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.route')
const addressRoutes = require('./address.route')
const profileRoutes = require('./profile.route')
const userRoutes = require('./user.route')
const couponRoutes = require('./coupon.route')
const transactionRoutes = require('./transaction.route')
const taskRoutes = require('./task.route')

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/address', addressRoutes)
router.use('/profile', profileRoutes)
router.use('/coupons', couponRoutes)
router.use('/transactions', transactionRoutes)
router.use('/task', taskRoutes)

module.exports = router
