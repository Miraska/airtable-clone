const { clientService } = require('../services');

const getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await clientService.getById(req.params.id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClient = async (req, res) => {
  try {
    const newClient = await clientService.create(req.body);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const updatedClient = await clientService.update(req.params.id, req.body);
    if (updatedClient) {
      res.json(updatedClient);
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const deletedClient = await clientService.delete(req.params.id);
    if (deletedClient) {
      res.json({ message: 'Client deleted successfully' });
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
