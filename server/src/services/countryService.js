const countryModel = require('../models/countryModel');

// Get all countries
const getAllCountries = async () => {
  return await countryModel.getAllCountries();
};

// Create a new country
const createCountry = async (data) => {
  return await countryModel.createCountry(data);
};

// Get a country by ID
const getCountryById = async (id) => {
  return await countryModel.getCountryById(id);
};

// Update a country by ID
const updateCountryById = async (id, data) => {
  return await countryModel.updateCountryById(id, data);
};

// Delete a country by ID
const deleteCountryById = async (id) => {
  return await countryModel.deleteCountryById(id);
};

module.exports = {
  getAllCountries,
  createCountry,
  getCountryById,
  updateCountryById,
  deleteCountryById,
};
