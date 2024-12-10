const BaseService = require('./baseService');
const {
  Order,
  Manager,
  Contractor,
  Agent,
  Client,
  Subagent,
  Country,
  SubagentPayer,
  Reviewer
} = require('../models/entities');

class OrderService extends BaseService {
  constructor() {
    super(Order, [
      { model: Manager, as: 'managers' },
      { model: Manager, as: 'reviewers' },
      { model: Contractor, as: 'contractors' },
      { model: Agent, as: 'agents' },
      { model: Client, as: 'clients' },
      { model: Country, as: 'countries' },
      { model: Subagent, as: 'subagents' },
      { model: SubagentPayer, as: 'subagentPayers' }
    ]);
  }
}

module.exports = new OrderService();
