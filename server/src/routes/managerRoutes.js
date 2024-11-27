const express = require('express');
const managerController = require('../controllers/managerController.js');
const router = express.Router();

router.get('/', managerController.getAllManagers);
router.post('/', managerController.createManager);
router.get('/:id', managerController.getManagerById);
router.put('/:id', managerController.updateManagerById);
router.delete('/:id', managerController.deleteManagerById);

module.exports = router;