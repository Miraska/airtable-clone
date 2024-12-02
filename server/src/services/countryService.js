const BaseService = require('./baseService');
const { Country, Order } = require('../models/entities');

class CountryService extends BaseService {
  constructor() {
    super(Country, [
      { model: Order, as: 'orders' } // Ассоциация страны с заявками
    ]);
  }
}

module.exports = new CountryService();
