const express = require('express');
const { getAllAgents, getAgentById, createAgent, updateAgent, deleteAgent } = require('../controllers/agentController');

const router = express.Router();

router.get('/', getAllAgents);
router.get('/:id', getAgentById);
router.post('/', createAgent);
router.put('/:id', updateAgent);
router.delete('/:id', deleteAgent);

module.exports = router;
