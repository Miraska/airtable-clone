const clientModel = require('../models/clientModel');

// Get all clients
const getAllClients = async () => {
  return await clientModel.getAllClients();
};

// Create a new client
const createClient = async (data) => {
  return await clientModel.createClient(data);
};

// Get a client by ID
const getClientById = async (id) => {
  return await clientModel.getClientById(id);
};

// Update a client by ID
const updateClientById = async (id, data) => {
  return await clientModel.updateClientById(id, data);
};

// Delete a client by ID
const deleteClientById = async (id) => {
  return await clientModel.deleteClientById(id);
};

module.exports = {
  getAllClients,
  createClient,
  getClientById,
  updateClientById,
  deleteClientById,
};
