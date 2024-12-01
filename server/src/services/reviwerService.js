const BaseService = require('./baseService');
const { Reviewer, Order } = require('../models/entities');

class ReviewerService extends BaseService {
  constructor() {
    super(Reviewer, [
      { model: Order, as: 'orders' } // Ассоциация проверяющих с заявками
    ]);
  }
}

module.exports = new ReviewerService();
