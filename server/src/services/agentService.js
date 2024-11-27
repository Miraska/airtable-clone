const agentModel = require('../models/agentModel');

// Get all agents
const getAllAgents = async () => {
  return await agentModel.getAllAgents();
};

// Create a new agent
const createAgent = async (data) => {
  return await agentModel.createAgent(data);
};

// Get an agent by ID
const getAgentById = async (id) => {
  return await agentModel.getAgentById(id);
};

// Update an agent by ID
const updateAgentById = async (id, data) => {
  return await agentModel.updateAgentById(id, data);
};

// Delete an agent by ID
const deleteAgentById = async (id) => {
  return await agentModel.deleteAgentById(id);
};

module.exports = {
  getAllAgents,
  createAgent,
  getAgentById,
  updateAgentById,
  deleteAgentById,
};
