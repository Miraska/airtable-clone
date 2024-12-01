const BaseService = require('./baseService');
const { Client, Order } = require('../models/entities');

class ClientService extends BaseService {
  constructor() {
    super(Client, [
      { model: Order, as: 'orders' } // Ассоциация клиентов с заявками
    ]);
  }
}

module.exports = new ClientService();
