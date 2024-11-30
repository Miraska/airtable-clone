const BaseService = require('./baseService');
const { Agent, Order } = require('../models/entities');

class AgentService extends BaseService {
  constructor() {
    super(Agent, [
      { model: Order, as: 'orders' } // Ассоциация агентов с заявками
    ]);
  }
}

module.exports = new AgentService();
