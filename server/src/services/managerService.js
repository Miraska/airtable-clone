const BaseService = require('./baseService');
const { Manager, Reviewer, Order } = require('../models/entities');

class ManagerService extends BaseService {
  constructor() {
    super(Manager, [
      { model: Order, as: 'orders' }, // !!!
      { model: Order, as: 'reviews' },
    ]);
  }

  async create(data) {
    const manager = await super.create(data);

    // Создаем проверяющего с аналогичными данными
    const reviewerData = {
      name: manager.name,
      tel: manager.tel,
      date: manager.date,
    };

    let reviewer;
    try {
      reviewer = await Reviewer.create(reviewerData);
    } catch (error) {
      console.error(`Failed to create associated reviewer:`, error);
      throw new Error('Failed to create associated reviewer.');
    }

    // Связываем проверяющего с другой заявкой (если требуется)
    if (data.linkedOrderId) {
      const order = await Order.findByPk(data.linkedOrderId);
      if (order) {
        await reviewer.addOrder(order);
      } else {
        console.warn(`Linked order with ID ${data.linkedOrderId} not found.`);
      }
    }

    return manager;
  }
}

module.exports = new ManagerService();
