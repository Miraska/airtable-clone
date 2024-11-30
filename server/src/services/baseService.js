const { sequelize } = require('../models/entities');

class BaseService {
  constructor(model, includes = []) {
    this.model = model;
    this.includes = includes; // Массив связанных моделей
  }

  async getAll() {
    try {
      return await this.model.findAll({ include: this.includes });
    } catch (error) {
      console.error(`Error fetching all records for ${this.model.name}:`, error);
      throw new Error('Failed to fetch all records.');
    }
  }

  async getById(id) {
    try {
      const record = await this.model.findByPk(id, { include: this.includes });
      if (!record) {
        throw new Error(`Record with id ${id} not found.`);
      }
      return record;
    } catch (error) {
      console.error(`Error fetching record by ID for ${this.model.name}:`, error);
      throw new Error('Failed to fetch record by ID.');
    }
  }

  async create(data) {
    const transaction = await sequelize.transaction().catch(err => {
      console.error('Error creating transaction:', err);
    });
    if (!transaction) throw new Error('Unable to create transaction');

    try {
      const newEntity = await this.model.create(data, { transaction });

      // Если есть связанные данные, устанавливаем связи
      for (const include of this.includes) {
        const alias = include.as;
        if (data[alias]) {
          await newEntity[`set${alias.charAt(0).toUpperCase() + alias.slice(1)}`](
            data[alias].map(item => item.id),
            { transaction }
          );
        }
      }

      await transaction.commit();
      return newEntity;
    } catch (error) {
      await transaction.rollback();
      console.error(`Error creating record for ${this.model.name}:`, error);
      throw new Error('Failed to create record.');
    }
  }

  async update(id, data) {
    const transaction = await sequelize.transaction().catch(err => {
      console.error('Error creating transaction:', err);
    });
    if (!transaction) throw new Error('Unable to create transaction');

    try {
      const entity = await this.model.findByPk(id, { transaction });
      if (!entity) {
        throw new Error(`Record with id ${id} not found.`);
      }

      await entity.update(data, { transaction });

      // Обновление связей
      for (const include of this.includes) {
        const alias = include.as;
        if (data[alias]) {
          await entity[`set${alias.charAt(0).toUpperCase() + alias.slice(1)}`](
            data[alias].map(item => item.id),
            { transaction }
          );
        }
      }

      await transaction.commit();
      return entity;
    } catch (error) {
      await transaction.rollback();
      console.error(`Error updating record for ${this.model.name}:`, error);
      throw new Error('Failed to update record.');
    }
  }

  async delete(id) {
    try {
      const entity = await this.model.findByPk(id);
      if (!entity) {
        throw new Error(`Record with id ${id} not found.`);
      }
      await entity.destroy();
      return { message: 'Entity deleted successfully' };
    } catch (error) {
      console.error(`Error deleting record for ${this.model.name}:`, error);
      throw new Error('Failed to delete record.');
    }
  }
}

module.exports = BaseService;
