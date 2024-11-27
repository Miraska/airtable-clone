const express = require('express');
const subagentController = require('../controllers/subagentController'); // Ensure the path is correct
const router = express.Router();

router.get('/', subagentController.getAllSubagents);
router.post('/', subagentController.createSubagent);
router.get('/:id', subagentController.getSubagentById);
router.put('/:id', subagentController.updateSubagentById);
router.delete('/:id', subagentController.deleteSubagentById);

module.exports = router;
