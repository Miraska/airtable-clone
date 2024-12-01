const { managerService } = require('../services');

const getAllManagers = async (req, res) => {
  try {
    const managers = await managerService.getAll();
    res.json(managers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getManagerById = async (req, res) => {
  try {
    const manager = await managerService.getById(req.params.id);
    if (manager) {
      res.json(manager);
    } else {
      res.status(404).json({ error: 'Manager not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createManager = async (req, res) => {
  try {
    const newManager = await managerService.create(req.body);
    res.status(201).json(newManager);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateManager = async (req, res) => {
  try {
    const updatedManager = await managerService.update(req.params.id, req.body);
    if (updatedManager) {
      res.json(updatedManager);
    } else {
      res.status(404).json({ error: 'Manager not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteManager = async (req, res) => {
  try {
    const deletedManager = await managerService.delete(req.params.id);
    if (deletedManager) {
      res.json({ message: 'Manager deleted successfully' });
    } else {
      res.status(404).json({ error: 'Manager not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllManagers,
  getManagerById,
  createManager,
  updateManager,
  deleteManager,
};
