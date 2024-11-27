const contractorModel = require('../models/contractorModel');

// Get all contractors
const getAllContractors = async () => {
  return await contractorModel.getAllContractors();
};

// Create a new contractor
const createContractor = async (data) => {
  return await contractorModel.createContractor(data);
};

// Get a contractor by ID
const getContractorById = async (id) => {
  return await contractorModel.getContractorById(id);
};

// Update a contractor by ID
const updateContractorById = async (id, data) => {
  return await contractorModel.updateContractorById(id, data);
};

// Delete a contractor by ID
const deleteContractorById = async (id) => {
  return await contractorModel.deleteContractorById(id);
};

module.exports = {
  getAllContractors,
  createContractor,
  getContractorById,
  updateContractorById,
  deleteContractorById,
};
