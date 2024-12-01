const { contractorService } = require('../services');

const getAllContractors = async (req, res) => {
  try {
    const contractors = await contractorService.getAll();
    res.json(contractors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContractorById = async (req, res) => {
  try {
    const contractor = await contractorService.getById(req.params.id);
    if (contractor) {
      res.json(contractor);
    } else {
      res.status(404).json({ error: 'Contractor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createContractor = async (req, res) => {
  try {
    const newContractor = await contractorService.create(req.body);
    res.status(201).json(newContractor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateContractor = async (req, res) => {
  try {
    const updatedContractor = await contractorService.update(req.params.id, req.body);
    if (updatedContractor) {
      res.json(updatedContractor);
    } else {
      res.status(404).json({ error: 'Contractor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteContractor = async (req, res) => {
  try {
    const deletedContractor = await contractorService.delete(req.params.id);
    if (deletedContractor) {
      res.json({ message: 'Contractor deleted successfully' });
    } else {
      res.status(404).json({ error: 'Contractor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllContractors,
  getContractorById,
  createContractor,
  updateContractor,
  deleteContractor,
};
