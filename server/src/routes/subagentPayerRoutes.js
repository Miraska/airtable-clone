const express = require('express');
const { getAllSubagentPayers, getSubagentPayerById, createSubagentPayer, updateSubagentPayer, deleteSubagentPayer } = require('../controllers/subagentPayerController');

const router = express.Router();

router.get('/', getAllSubagentPayers);
router.get('/:id', getSubagentPayerById);
router.post('/', createSubagentPayer);
router.put('/:id', updateSubagentPayer);
router.delete('/:id', deleteSubagentPayer);

module.exports = router;
