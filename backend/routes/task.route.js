const express = require('express');
const router = express.Router();
const taskController = require('../controllers/earn.controller');

router.post('/', taskController.create);
router.get('/', taskController.getTask);
router.get('/getbyvendorId/:id', taskController.getTasksByVendorId);
router.get('/:id', taskController.getTaskById);

module.exports = router;