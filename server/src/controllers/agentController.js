const agentService = require('../services/agentService');

// Controller for getting all agents
const getAllAgents = async (req, res) => {
  try {
    const agents = await agentService.getAllAgents();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agents', details: error.message });
  }
};

// Controller for creating a new agent
const createAgent = async (req, res) => {
  try {
    const newAgent = await agentService.createAgent(req.body);
    res.status(201).json(newAgent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create agent', details: error.message });
  }
};

// Controller for getting an agent by ID
const getAgentById = async (req, res) => {
  try {
    const agent = await agentService.getAgentById(req.params.id);
    if (agent) {
      res.json(agent);
    } else {
      res.status(404).json({ error: 'Agent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agent', details: error.message });
  }
};

// Controller for updating an agent by ID
const updateAgentById = async (req, res) => {
  try {
    const updatedAgent = await agentService.updateAgentById(req.params.id, req.body);
    if (updatedAgent) {
      res.json(updatedAgent);
    } else {
      res.status(404).json({ error: 'Agent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update agent', details: error.message });
  }
};

// Controller for deleting an agent by ID
const deleteAgentById = async (req, res) => {
  try {
    await agentService.deleteAgentById(req.params.id);
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete agent', details: error.message });
  }
};

module.exports = {
  getAllAgents,
  createAgent,
  getAgentById,
  updateAgentById,
  deleteAgentById,
};
