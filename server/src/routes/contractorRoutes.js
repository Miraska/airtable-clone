const express = require('express');
const { getAllContractors, getContractorById, createContractor, updateContractor, deleteContractor } = require('../controllers/contractorController');

const router = express.Router();

router.get('/', getAllContractors);
router.get('/:id', getContractorById);
router.post('/', createContractor);
router.put('/:id', updateContractor);
router.delete('/:id', deleteContractor);

module.exports = router;
