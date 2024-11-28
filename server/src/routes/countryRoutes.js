const express = require('express');
const { getAllCountries, getCountryById, createCountry, updateCountry, deleteCountry } = require('../controllers/countryController');

const router = express.Router();

router.get('/', getAllCountries);
router.get('/:id', getCountryById);
router.post('/', createCountry);
router.put('/:id', updateCountry);
router.delete('/:id', deleteCountry);

module.exports = router;
