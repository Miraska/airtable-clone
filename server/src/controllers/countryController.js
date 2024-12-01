const { countryService } = require('../services');

const getAllCountries = async (req, res) => {
  try {
    const countries = await countryService.getAll();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCountryById = async (req, res) => {
  try {
    const country = await countryService.getById(req.params.id);
    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCountry = async (req, res) => {
  try {
    const newCountry = await countryService.create(req.body);
    res.status(201).json(newCountry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCountry = async (req, res) => {
  try {
    const updatedCountry = await countryService.update(req.params.id, req.body);
    if (updatedCountry) {
      res.json(updatedCountry);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const deletedCountry = await countryService.delete(req.params.id);
    if (deletedCountry) {
      res.json({ message: 'Country deleted successfully' });
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry
};
