const calculateFields = require("../utils/calculation"); // Импорт функции расчетов
const sequelize = require("../db/connection"); // Подключаем sequelize правильно

class BaseService {
  constructor(model, includes = []) {
    this.model = model;
    this.includes = includes; // Массив связанных моделей
  }

  extractIds(data) {
    if (Array.isArray(data)) {
      return data.map((item) => item.id);
    } else if (data && data.id) {
      return data.id;
    }
    return null;
  }

  filterSingleRecord(record) {
    const filteredRecord = { ...record.toJSON() };
    this.includes.forEach((include) => {
      const alias = include.as;
      if (filteredRecord[alias]) {
        filteredRecord[alias] = this.extractIds(filteredRecord[alias]);
      }
    });
    return filteredRecord;
  }

  filterResponse(data) {
    if (Array.isArray(data)) {
      return data.map((item) => this.filterSingleRecord(item));
    } else {
      return this.filterSingleRecord(data);
    }
  }

  async getAll() {
    try {
      const records = await this.model.findAll({ include: this.includes });
      return this.filterResponse(records);
    } catch (error) {
      console.error(
        `Error fetching all records for ${this.model.name}:`,
        error
      );
      throw new Error("Failed to fetch all records.");
    }
  }

  async getById(id) {
    try {
      const record = await this.model.findByPk(id, { include: this.includes });
      if (!record) {
        throw new Error(`Record with id ${id} not found.`);
      }
      return this.filterSingleRecord(record);
    } catch (error) {
      console.error(
        `Error fetching record by ID for ${this.model.name}:`,
        error
      );
      throw new Error("Failed to fetch record by ID.");
    }
  }

  async create(data) {
    let transaction;

    try {
      // Создаем транзакцию
      transaction = await sequelize.transaction();
      if (!transaction) {
        throw new Error("Unable to create transaction");
      }
    } catch (err) {
      console.error("Error creating transaction:", err);
      throw new Error("Transaction creation failed.");
    }

    try {
      // Вычисление данных перед сохранением
      const calculatedData = calculateFields(data);

      // Объединяем оригинальные и вычисленные данные
      const dataToSave = { ...data, ...calculatedData };

      // Создаем новую запись
      const newEntity = await this.model.create(dataToSave, { transaction });

      // Обрабатываем связанные сущности
      for (const include of this.includes) {
        const alias = include.as;
        const methodName = `set${
          alias.charAt(0).toUpperCase() + alias.slice(1)
        }`;

        if (data[alias] && typeof newEntity[methodName] === "function") {
          await newEntity[methodName](data[alias], { transaction });
        }
      }

      // Подтверждаем транзакцию
      await transaction.commit();

      // Возвращаем обработанную запись
      return this.filterSingleRecord(newEntity);
    } catch (error) {
      // Откатываем транзакцию в случае ошибки
      if (transaction) await transaction.rollback();
      console.error(`Error creating record for ${this.model.name}:`, error);
      throw new Error("Failed to create record.");
    }
  }

  async update(id, data) {
    let transaction;

    try {
      // Создаем транзакцию
      transaction = await sequelize.transaction();
      if (!transaction) {
        throw new Error("Unable to create transaction");
      }
    } catch (err) {
      console.error("Error creating transaction:", err);
      throw new Error("Transaction creation failed.");
    }

    try {
      // Находим существующую запись
      const entity = await this.model.findByPk(id, { transaction });
      if (!entity) {
        throw new Error(`Record with id ${id} not found.`);
      }

      // Вычисление данных перед обновлением
      const calculatedData = calculateFields(data);

      // Объединяем оригинальные и вычисленные данные
      const dataToUpdate = { ...data, ...calculatedData };

      // Обновляем запись
      await entity.update(dataToUpdate, { transaction });

      // Обрабатываем связанные сущности
      for (const include of this.includes) {
        const alias = include.as;
        const methodName = `set${
          alias.charAt(0).toUpperCase() + alias.slice(1)
        }`;

        if (data[alias] && typeof entity[methodName] === "function") {
          await entity[methodName](data[alias], { transaction });
        }
      }

      // Подтверждаем транзакцию
      await transaction.commit();

      // Возвращаем обработанную запись
      return this.filterSingleRecord(entity);
    } catch (error) {
      // Откатываем транзакцию в случае ошибки
      if (transaction) await transaction.rollback();
      console.error(`Error updating record for ${this.model.name}:`, error);
      throw new Error("Failed to update record.");
    }
  }

  async delete(id) {
    try {
      const entity = await this.model.findByPk(id);
      if (!entity) {
        throw new Error(`Record with id ${id} not found.`);
      }
      await entity.destroy();
      return { message: "Entity deleted successfully" };
    } catch (error) {
      console.error(`Error deleting record for ${this.model.name}:`, error);
      throw new Error("Failed to delete record.");
    }
  }
}

module.exports = BaseService;
