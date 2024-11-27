const requestService = require('../services/requestService.js');


// Контроллер для получения всех заявок
const getAllRequests = async (req, res) => {
  try {
    const requests = await requestService.getAllRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

// Контроллер для создания новой заявки
const createRequest = async (req, res) => {
  try {
    const newRequest = await requestService.createRequest(req.body);
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create request' });
  }
};

// Контроллер для получения заявки по ID
const getRequestById = async (req, res) => {
  try {
    const request = await requestService.getRequestById(req.params.id);
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch request' });
  }
};

// Контроллер для получения обновления заявок
const updateAllRequests = async(req, res) => {
  try {
    const requests = await requestService.updateAllRequests();
    if (requests) {
      res.json(requests);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch request' });
  }
}

module.exports = {
  getAllRequests,
  createRequest,
  getRequestById,
  updateAllRequests
};
