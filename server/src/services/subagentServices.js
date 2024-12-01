const BaseService = require('./baseService');
const { Subagent, Order, SubagentPayer } = require('../models/entities');

class SubagentService extends BaseService {
  constructor() {
    super(Subagent, [
      { model: Order, as: 'orders' },
      { model: SubagentPayer, as: 'payers' }
    ]);
  }
}

module.exports = new SubagentService();
