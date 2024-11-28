const BaseService = require('./baseService');
const { Contractor } = require('../models/entities');

class ContractorService extends BaseService {
  constructor() {
    super(Contractor);
  }
}

module.exports = new ContractorService();
