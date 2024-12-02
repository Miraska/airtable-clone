const BaseService = require('./baseService');
const { Manager, Order } = require('../models/entities');

class ManagerService extends BaseService {
  constructor() {
    super(Manager, [
      { model: Order, as: 'orders' } // Ассоциация менеджеров с заявками
    ]);
  }
}

module.exports = new ManagerService();
