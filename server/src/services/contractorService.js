const BaseService = require('./baseService');
const { Contractor, Order } = require('../models/entities');

class ContractorService extends BaseService {
  constructor() {
    super(Contractor, [
      { model: Order, as: 'orders' } // Ассоциация контрагентов с заявками
    ]);
  }
}

module.exports = new ContractorService();
