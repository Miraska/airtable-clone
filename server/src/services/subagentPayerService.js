const subagentPayerModel = require('../models/subagentPayerModel');

// Get all subagent payers
const getAllSubagentPayers = async () => {
  return await subagentPayerModel.getAllSubagentPayers();
};

// Create a new subagent payer
const createSubagentPayer = async (data) => {
  return await subagentPayerModel.createSubagentPayer(data);
};

// Get a subagent payer by ID
const getSubagentPayerById = async (id) => {
  return await subagentPayerModel.getSubagentPayerById(id);
};

// Update a subagent payer by ID
const updateSubagentPayerById = async (id, data) => {
  return await subagentPayerModel.updateSubagentPayerById(id, data);
};

// Delete a subagent payer by ID
const deleteSubagentPayerById = async (id) => {
  return await subagentPayerModel.deleteSubagentPayerById(id);
};

module.exports = {
  getAllSubagentPayers,
  createSubagentPayer,
  getSubagentPayerById,
  updateSubagentPayerById,
  deleteSubagentPayerById,
};
