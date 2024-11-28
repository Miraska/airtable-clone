const express = require('express');
const { getAllSubagents, getSubagentById, createSubagent, updateSubagent, deleteSubagent } = require('../controllers/subagentController');

const router = express.Router();

router.get('/', getAllSubagents);
router.get('/:id', getSubagentById);
router.post('/', createSubagent);
router.put('/:id', updateSubagent);
router.delete('/:id', deleteSubagent);

module.exports = router;
