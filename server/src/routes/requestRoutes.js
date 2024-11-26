const express = require('express');
const requestController = require('../controllers/requestController.js');
const router = express.Router();

router.get('/requests', requestController.getAllRequests);
router.post('/requests', requestController.createRequest);

module.exports = router;
