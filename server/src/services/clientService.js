const BaseService = require('./baseService');
const { Client } = require('../models/entities');

class ClientService extends BaseService {
  constructor() {
    super(Client);
  }
}

module.exports = new ClientService();
