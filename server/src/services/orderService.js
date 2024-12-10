const BaseService = require('./baseService');
const {
  Order,
  Manager,
  Reviewer,
  Contractor,
  Agent,
  Client,
  Subagent,
  Country,
  SubagentPayer,
} = require('../models/entities');

class OrderService extends BaseService {
  constructor() {
    super(Order, [
      { model: Manager, as: 'managers' },
      { model: Reviewer, as: 'reviewers' },
      { model: Contractor, as: 'contractors' },
      { model: Agent, as: 'agents' },
      { model: Client, as: 'clients' },
      { model: Country, as: 'countries' },
      { model: Subagent, as: 'subagents' },
      { model: SubagentPayer, as: 'subagentPayers' },
    ]);
  }

  async linkReviewerToOrder(reviewerId, orderId) {
    try {
      const reviewer = await Reviewer.findByPk(reviewerId);
      const order = await this.model.findByPk(orderId);

      if (!reviewer || !order) {
        throw new Error('Reviewer or Order not found.');
      }

      await reviewer.addOrder(order);
      return { message: 'Reviewer linked to order successfully.' };
    } catch (error) {
      console.error(`Error linking reviewer to order:`, error);
      throw new Error('Failed to link reviewer to order.');
    }
  }
}

module.exports = new OrderService();
