const express = require('express');
const countryController = require('../controllers/countryController'); // Ensure the path is correct
const router = express.Router();

router.get('/', countryController.getAllCountries);
router.post('/', countryController.createCountry);
router.get('/:id', countryController.getCountryById);
router.put('/:id', countryController.updateCountryById);
router.delete('/:id', countryController.deleteCountryById);

module.exports = router;
