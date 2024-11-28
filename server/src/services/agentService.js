const BaseService = require('./baseService');
const { Agent } = require('../models/entities');

class AgentService extends BaseService {
  constructor() {
    super(Agent);
  }
}

module.exports = new AgentService();
