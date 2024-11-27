const db = require('../config/dbConfig');

// Создание нового менеджера
const createManager = async (data) => {
  const { rows } = await db.query(
    `INSERT INTO managers (name, phone, birthday, airtable_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [data.name, data.phone, data.birthday, data.airtable_id]
  );
  return rows[0];
};

// Получение всех менеджеров
const getAllManagers = async () => {
  const { rows } = await db.query('SELECT * FROM managers');
  return rows;
};

// Получение менеджера по ID
const getManagerById = async (id) => {
  const { rows } = await db.query('SELECT * FROM managers WHERE id = $1', [id]);
  return rows[0];
};

// Обновление менеджера по ID
const updateManagerById = async (id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setString = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
  const { rows } = await db.query(
    `UPDATE managers SET ${setString} WHERE id = $${keys.length + 1} RETURNING *`,
    [...values, id]
  );
  return rows[0];
};

// Удаление менеджера по ID
const deleteManagerById = async (id) => {
  await db.query('DELETE FROM managers WHERE id = $1', [id]);
  return { message: 'Менеджер успешно удален' };
};

module.exports = {
  createManager,
  getAllManagers,
  getManagerById,
  updateManagerById,
  deleteManagerById,
};