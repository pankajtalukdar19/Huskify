const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon.controller');
const { auth } = require('../middleware/auth.middleware');

router.use(auth);

router.post('/', couponController.create);
router.get('/user/:userId', couponController.getUserCoupons);

module.exports = router;
