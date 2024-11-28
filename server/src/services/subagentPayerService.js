const BaseService = require('./baseService');
const { SubagentPayer } = require('../models/entities');

class SubagentPayerService extends BaseService {
  constructor() {
    super(SubagentPayer);
  }
}

module.exports = new SubagentPayerService();
