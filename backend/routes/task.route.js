const express = require('express');
const router = express.Router();
const taskController = require('../controllers/earn.controller');

router.post('/', taskController.create);
router.get('/', taskController.getTask);

module.exports = router;