const { subagentService } = require('../services');

const getAllSubagents = async (req, res) => {
  try {
    const subagents = await subagentService.getAll();
    res.json(subagents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSubagentById = async (req, res) => {
  try {
    const subagent = await subagentService.getById(req.params.id);
    if (subagent) {
      res.json(subagent);
    } else {
      res.status(404).json({ error: 'Subagent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSubagent = async (req, res) => {
  try {
    const newSubagent = await subagentService.create(req.body);
    res.status(201).json(newSubagent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSubagent = async (req, res) => {
  try {
    const updatedSubagent = await subagentService.update(req.params.id, req.body);
    if (updatedSubagent) {
      res.json(updatedSubagent);
    } else {
      res.status(404).json({ error: 'Subagent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSubagent = async (req, res) => {
  try {
    const deletedSubagent = await subagentService.delete(req.params.id);
    if (deletedSubagent) {
      res.json({ message: 'Subagent deleted successfully' });
    } else {
      res.status(404).json({ error: 'Subagent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSubagents,
  getSubagentById,
  createSubagent,
  updateSubagent,
  deleteSubagent,
};
