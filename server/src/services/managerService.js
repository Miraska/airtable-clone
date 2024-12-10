const BaseService = require('./baseService');
const { Manager, Order } = require('../models/entities');

class ManagerService extends BaseService {
  constructor() {
    super(Manager, [
      { model: Order, as: 'orders' },
      { model: Order, as: 'reviews' },
    ]);
  }
}

module.exports = new ManagerService();
