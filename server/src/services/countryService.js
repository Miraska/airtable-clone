const BaseService = require('./baseService');
const { Country } = require('../models/entities');

class CountryService extends BaseService {
  constructor() {
    super(Country);
  }
}

module.exports = new CountryService();
