const requestModel = require('../models/requestModel.js');
const syncService = require('./syncService.js');

// Создание заявки
const createRequest = async (data) => {
  return await requestModel.createRequest(data);
};

// Получение заявки по ID
const getRequestById = async (id) => {
  return await requestModel.getRequestById(id);
};

// Получение всех заявок
const getAllRequests = async () => {
  return await requestModel.getAllRequestsModel();
};

// Обновление всех заявок
const updateAllRequests = async() => {
  await requestModel.resetDatabase();
  return await requestModel.getAllRequestsModel();
}

module.exports = {
  createRequest,
  getRequestById,
  getAllRequests,
  updateAllRequests: updateAllRequests
};
