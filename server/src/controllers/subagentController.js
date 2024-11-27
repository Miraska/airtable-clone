const subagentService = require('../services/subagentService');

// Controller for getting all subagents
const getAllSubagents = async (req, res) => {
  try {
    const subagents = await subagentService.getAllSubagents();
    res.json(subagents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subagents', details: error.message });
  }
};

// Controller for creating a new subagent
const createSubagent = async (req, res) => {
  try {
    const newSubagent = await subagentService.createSubagent(req.body);
    res.status(201).json(newSubagent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subagent', details: error.message });
  }
};

// Controller for getting a subagent by ID
const getSubagentById = async (req, res) => {
  try {
    const subagent = await subagentService.getSubagentById(req.params.id);
    if (subagent) {
      res.json(subagent);
    } else {
      res.status(404).json({ error: 'Subagent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subagent', details: error.message });
  }
};

// Controller for updating a subagent by ID
const updateSubagentById = async (req, res) => {
  try {
    const updatedSubagent = await subagentService.updateSubagentById(req.params.id, req.body);
    if (updatedSubagent) {
      res.json(updatedSubagent);
    } else {
      res.status(404).json({ error: 'Subagent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subagent', details: error.message });
  }
};

// Controller for deleting a subagent by ID
const deleteSubagentById = async (req, res) => {
  try {
    await subagentService.deleteSubagentById(req.params.id);
    res.status(200).json({ message: 'Subagent deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subagent', details: error.message });
  }
};

module.exports = {
  getAllSubagents,
  createSubagent,
  getSubagentById,
  updateSubagentById,
  deleteSubagentById,
};
