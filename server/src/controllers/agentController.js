const { agentService } = require('../services');

const getAllAgents = async (req, res) => {
  try {
    const agents = await agentService.getAll();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAgentById = async (req, res) => {
  try {
    const agent = await agentService.getById(req.params.id);
    if (agent) {
      res.json(agent);
    } else {
      res.status(404).json({ error: 'Агент не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAgent = async (req, res) => {
  try {
    const newAgent = await agentService.create(req.body);
    res.status(201).json(newAgent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAgent = async (req, res) => {
  try {
    const updatedAgent = await agentService.update(req.params.id, req.body);
    if (updatedAgent) {
      res.json(updatedAgent);
    } else {
      res.status(404).json({ error: 'Агент не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAgent = async (req, res) => {
  try {
    const deletedAgent = await agentService.delete(req.params.id);
    if (deletedAgent) {
      res.json({ message: 'Агент успешно удалён' });
    } else {
      res.status(404).json({ error: 'Агент не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent,
};
