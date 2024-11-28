class BaseService {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return await this.model.findAll();
  }

  async getById(id) {
    return await this.model.findByPk(id);
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    const entity = await this.model.findByPk(id);
    if (entity) {
      return await entity.update(data);
    }
    return null;
  }

  async delete(id) {
    const entity = await this.model.findByPk(id);
    if (entity) {
      await entity.destroy();
      return { message: 'Entity deleted successfully' };
    }
    return null;
  }
}

module.exports = BaseService;
