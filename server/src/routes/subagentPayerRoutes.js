const express = require('express');
const subagentPayerController = require('../controllers/subagentPayerController'); // Make sure the path is correct
const router = express.Router();

router.get('/', subagentPayerController.getAllSubagentPayers);
router.post('/', subagentPayerController.createSubagentPayer);
router.get('/:id', subagentPayerController.getSubagentPayerById);
router.put('/:id', subagentPayerController.updateSubagentPayerById);
router.delete('/:id', subagentPayerController.deleteSubagentPayerById);

module.exports = router;
