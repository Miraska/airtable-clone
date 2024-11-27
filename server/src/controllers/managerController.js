const managerService = require('../services/managerService.js');

// Контроллер для получения всех менеджеров
const getAllManagers = async (req, res) => {
  try {
    const managers = await managerService.getAllManagers();
    res.json(managers);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось получить менеджеров' });
  }
};

// Контроллер для создания нового менеджера
const createManager = async (req, res) => {
  try {
    const newManager = await managerService.createManager(req.body);
    res.status(201).json(newManager);
  } catch (error) {
    res.status(500).json({ error: 'Не удалось создать менеджера' });
  }
};

// Контроллер для получения менеджера по ID
const getManagerById = async (req, res) => {
  try {
    const manager = await managerService.getManagerById(req.params.id);
    if (manager) {
      res.json(manager);
    } else {
      res.status(404).json({ error: 'Менеджер не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Не удалось получить менеджера' });
  }
};

// Контроллер для обновления менеджера по ID
const updateManagerById = async (req, res) => {
  try {
    const updatedManager = await managerService.updateManagerById(req.params.id, req.body);
    if (updatedManager) {
      res.json(updatedManager);
    } else {
      res.status(404).json({ error: 'Менеджер не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Не удалось обновить менеджера' });
  }
};

// Контроллер для удаления менеджера по ID
const deleteManagerById = async (req, res) => {
  try {
    await managerService.deleteManagerById(req.params.id);
    res.status(200).json({ message: 'Менеджер успешно удален' });
  } catch (error) {
    res.status(500).json({ error: 'Не удалось удалить менеджера' });
  }
};

module.exports = {
  getAllManagers,
  createManager,
  getManagerById,
  updateManagerById,
  deleteManagerById,
};