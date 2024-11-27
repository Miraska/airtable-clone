const requestService = require('../services/requestService');

// Controller for getting all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await requestService.getAllRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests', details: error.message });
  }
};

// Controller for creating a new request
const createRequest = async (req, res) => {
  try {
    const newRequest = await requestService.createRequest({
      ...req.body,
      payer_id: req.body.payer_id,  // Заменено subagent_payer_id на payer_id
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create request', details: error.message });
  }
};

// Controller for getting a request by ID
const getRequestById = async (req, res) => {
  try {
    const request = await requestService.getRequestById(req.params.id);
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch request', details: error.message });
  }
};

// Controller for updating a request by ID
const updateRequestById = async (req, res) => {
  try {
    const updatedRequest = await requestService.updateRequestById(req.params.id, {
      ...req.body,
      payer_id: req.body.payer_id,  // Заменено subagent_payer_id на payer_id
    });
    if (updatedRequest) {
      res.json(updatedRequest);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update request', details: error.message });
  }
};

// Controller for deleting a request by ID
const deleteRequestById = async (req, res) => {
  try {
    await requestService.deleteRequestById(req.params.id);
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete request', details: error.message });
  }
};

module.exports = {
  getAllRequests,
  createRequest,
  getRequestById,
  updateRequestById,
  deleteRequestById,
};
