const express = require('express');
const agentController = require('../controllers/agentController');
const router = express.Router();

router.get('/', agentController.getAllAgents);
router.post('/', agentController.createAgent);
router.get('/:id', agentController.getAgentById);
router.put('/:id', agentController.updateAgentById);
router.delete('/:id', agentController.deleteAgentById);

module.exports = router;
