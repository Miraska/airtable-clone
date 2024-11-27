const countryService = require('../services/countryService');

// Controller for getting all countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await countryService.getAllCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries', details: error.message });
  }
};

// Controller for creating a new country
const createCountry = async (req, res) => {
  try {
    const newCountry = await countryService.createCountry(req.body);
    res.status(201).json(newCountry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create country', details: error.message });
  }
};

// Controller for getting a country by ID
const getCountryById = async (req, res) => {
  try {
    const country = await countryService.getCountryById(req.params.id);
    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country', details: error.message });
  }
};

// Controller for updating a country by ID
const updateCountryById = async (req, res) => {
  try {
    const updatedCountry = await countryService.updateCountryById(req.params.id, req.body);
    if (updatedCountry) {
      res.json(updatedCountry);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update country', details: error.message });
  }
};

// Controller for deleting a country by ID
const deleteCountryById = async (req, res) => {
  try {
    await countryService.deleteCountryById(req.params.id);
    res.status(200).json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete country', details: error.message });
  }
};

module.exports = {
  getAllCountries,
  createCountry,
  getCountryById,
  updateCountryById,
  deleteCountryById,
};
