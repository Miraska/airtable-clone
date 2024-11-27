const contractorService = require('../services/contractorService');

// Controller for getting all contractors
const getAllContractors = async (req, res) => {
  try {
    const contractors = await contractorService.getAllContractors();
    res.json(contractors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contractors', details: error.message });
  }
};

// Controller for creating a new contractor
const createContractor = async (req, res) => {
  try {
    const newContractor = await contractorService.createContractor(req.body);
    res.status(201).json(newContractor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contractor', details: error.message });
  }
};

// Controller for getting a contractor by ID
const getContractorById = async (req, res) => {
  try {
    const contractor = await contractorService.getContractorById(req.params.id);
    if (contractor) {
      res.json(contractor);
    } else {
      res.status(404).json({ error: 'Contractor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contractor', details: error.message });
  }
};

// Controller for updating a contractor by ID
const updateContractorById = async (req, res) => {
  try {
    const updatedContractor = await contractorService.updateContractorById(req.params.id, req.body);
    if (updatedContractor) {
      res.json(updatedContractor);
    } else {
      res.status(404).json({ error: 'Contractor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contractor', details: error.message });
  }
};

// Controller for deleting a contractor by ID
const deleteContractorById = async (req, res) => {
  try {
    await contractorService.deleteContractorById(req.params.id);
    res.status(200).json({ message: 'Contractor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contractor', details: error.message });
  }
};

module.exports = {
  getAllContractors,
  createContractor,
  getContractorById,
  updateContractorById,
  deleteContractorById,
};
