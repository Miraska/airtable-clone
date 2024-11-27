const clientService = require('../services/clientService');

// Controller for getting all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clients', details: error.message });
  }
};

// Controller for creating a new client
const createClient = async (req, res) => {
  try {
    const newClient = await clientService.createClient(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create client', details: error.message });
  }
};

// Controller for getting a client by ID
const getClientById = async (req, res) => {
  try {
    const client = await clientService.getClientById(req.params.id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch client', details: error.message });
  }
};

// Controller for updating a client by ID
const updateClientById = async (req, res) => {
  try {
    const updatedClient = await clientService.updateClientById(req.params.id, req.body);
    if (updatedClient) {
      res.json(updatedClient);
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update client', details: error.message });
  }
};

// Controller for deleting a client by ID
const deleteClientById = async (req, res) => {
  try {
    await clientService.deleteClientById(req.params.id);
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete client', details: error.message });
  }
};

module.exports = {
  getAllClients,
  createClient,
  getClientById,
  updateClientById,
  deleteClientById,
};
