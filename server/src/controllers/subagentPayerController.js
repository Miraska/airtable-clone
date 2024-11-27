const subagentPayerService = require('../services/subagentPayerService');

// Controller for getting all subagent payers
const getAllSubagentPayers = async (req, res) => {
  try {
    const subagentPayers = await subagentPayerService.getAllSubagentPayers();
    res.json(subagentPayers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subagent payers', details: error.message });
  }
};

// Controller for creating a new subagent payer
const createSubagentPayer = async (req, res) => {
  try {
    const newSubagentPayer = await subagentPayerService.createSubagentPayer(req.body);
    res.status(201).json(newSubagentPayer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subagent payer', details: error.message });
  }
};

// Controller for getting a subagent payer by ID
const getSubagentPayerById = async (req, res) => {
  try {
    const subagentPayer = await subagentPayerService.getSubagentPayerById(req.params.id);
    if (subagentPayer) {
      res.json(subagentPayer);
    } else {
      res.status(404).json({ error: 'Subagent payer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subagent payer', details: error.message });
  }
};

// Controller for updating a subagent payer by ID
const updateSubagentPayerById = async (req, res) => {
  try {
    const updatedSubagentPayer = await subagentPayerService.updateSubagentPayerById(req.params.id, req.body);
    if (updatedSubagentPayer) {
      res.json(updatedSubagentPayer);
    } else {
      res.status(404).json({ error: 'Subagent payer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subagent payer', details: error.message });
  }
};

// Controller for deleting a subagent payer by ID
const deleteSubagentPayerById = async (req, res) => {
  try {
    await subagentPayerService.deleteSubagentPayerById(req.params.id);
    res.status(200).json({ message: 'Subagent payer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subagent payer', details: error.message });
  }
};

module.exports = {
  getAllSubagentPayers,
  createSubagentPayer,
  getSubagentPayerById,
  updateSubagentPayerById,
  deleteSubagentPayerById,
};
