const BaseService = require('./baseService');
const { Subagent } = require('../models/entities');

class SubagentService extends BaseService {
  constructor() {
    super(Subagent);
  }
}

module.exports = new SubagentService();
