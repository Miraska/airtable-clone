const BaseService = require('./baseService');
const { Manager } = require('../models/entities');

class ManagerService extends BaseService {
  constructor() {
    super(Manager);
  }
}

module.exports = new ManagerService();
