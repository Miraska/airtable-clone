const express = require('express');
const clientController = require('../controllers/clientController'); // Make sure the path is correct
const router = express.Router();

router.get('/', clientController.getAllClients);
router.post('/', clientController.createClient);
router.get('/:id', clientController.getClientById);
router.put('/:id', clientController.updateClientById);
router.delete('/:id', clientController.deleteClientById);

module.exports = router;
