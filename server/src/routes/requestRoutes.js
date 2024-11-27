const express = require('express');
const requestController = require('../controllers/requestController');
const router = express.Router();

router.get('/', requestController.getAllRequests);
router.post('/', requestController.createRequest);
router.get('/:id', requestController.getRequestById);
router.put('/:id', requestController.updateRequestById);
router.delete('/:id', requestController.deleteRequestById);

module.exports = router;
