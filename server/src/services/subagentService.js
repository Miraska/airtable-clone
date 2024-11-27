const subagentModel = require('../models/subagentModel');

// Get all subagents
const getAllSubagents = async () => {
  return await subagentModel.getAllSubagents();
};

// Create a new subagent
const createSubagent = async (data) => {
  return await subagentModel.createSubagent(data);
};

// Get a subagent by ID
const getSubagentById = async (id) => {
  return await subagentModel.getSubagentById(id);
};

// Update a subagent by ID
const updateSubagentById = async (id, data) => {
  return await subagentModel.updateSubagentById(id, data);
};

// Delete a subagent by ID
const deleteSubagentById = async (id) => {
  return await subagentModel.deleteSubagentById(id);
};

module.exports = {
  getAllSubagents,
  createSubagent,
  getSubagentById,
  updateSubagentById,
  deleteSubagentById,
};
