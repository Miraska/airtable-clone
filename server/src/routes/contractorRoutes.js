const express = require('express');
const contractorController = require('../controllers/contractorController'); // Ensure the path is correct
const router = express.Router();

router.get('/', contractorController.getAllContractors);
router.post('/', contractorController.createContractor);
router.get('/:id', contractorController.getContractorById);
router.put('/:id', contractorController.updateContractorById);
router.delete('/:id', contractorController.deleteContractorById);

module.exports = router;
