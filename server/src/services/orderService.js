const BaseService = require('./baseService');
const { Order } = require('../models/entities');

class OrderService extends BaseService {
  constructor() {
    super(Order);
  }
}

module.exports = new OrderService();
