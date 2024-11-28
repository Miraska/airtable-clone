const { subagentPayerService } = require('../services');

const getAllSubagentPayers = async (req, res) => {
  try {
    const payers = await subagentPayerService.getAll();
    res.json(payers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSubagentPayerById = async (req, res) => {
  try {
    const payer = await subagentPayerService.getById(req.params.id);
    if (payer) {
      res.json(payer);
    } else {
      res.status(404).json({ error: 'Subagent payer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSubagentPayer = async (req, res) => {
  try {
    const newPayer = await subagentPayerService.create(req.body);
    res.status(201).json(newPayer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSubagentPayer = async (req, res) => {
  try {
    const updatedPayer = await subagentPayerService.update(req.params.id, req.body);
    if (updatedPayer) {
      res.json(updatedPayer);
    } else {
      res.status(404).json({ error: 'Subagent payer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSubagentPayer = async (req, res) => {
  try {
    const deletedPayer = await subagentPayerService.delete(req.params.id);
    if (deletedPayer) {
      res.json({ message: 'Subagent payer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Subagent payer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSubagentPayers,
  getSubagentPayerById,
  createSubagentPayer,
  updateSubagentPayer,
  deleteSubagentPayer,
};
