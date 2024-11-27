const requestModel = require('../models/requestModel.js');

// Create a new request
const createRequest = async (data) => {
  return await requestModel.createRequest({
    ...data,
    payer_id: data.payer_id,  // Заменено subagent_payer_id на payer_id
  });
};

// Get a request by ID
const getRequestById = async (id) => {
  return await requestModel.getRequestById(id);
};

// Get all requests
const getAllRequests = async () => {
  return await requestModel.getAllRequestsModel();
};

// Update a request by ID
const updateRequestById = async (id, data) => {
  return await requestModel.updateRequestById(id, {
    ...data,
    payer_id: data.payer_id,  // Заменено subagent_payer_id на payer_id
  });
};

// Delete a request by ID
const deleteRequestById = async (id) => {
  return await requestModel.deleteRequestById(id);
};

module.exports = {
  createRequest,
  getRequestById,
  getAllRequests,
  updateRequestById,
  deleteRequestById,
};
