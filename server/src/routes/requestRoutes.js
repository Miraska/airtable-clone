const express = require('express');
const requestController = require('../controllers/requestController.js');
const router = express.Router();

router.get('/', requestController.getAllRequests);
router.post('/', requestController.createRequest);
router.put('/', requestController.updateAllRequests);
router.get('/:id', requestController.getRequestById);

module.exports = router;
