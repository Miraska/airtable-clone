const db = require('../config/dbConfig');

// Create a new country
const createCountry = async (data) => {
  const query = `
    INSERT INTO countries (short_name, code, full_name, airtable_id) 
    VALUES ($1, $2, $3, $4) RETURNING *
  `;
  const values = [data.short_name, data.code, data.full_name, data.airtable_id];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Get a country by ID
const getCountryById = async (id) => {
  const query = 'SELECT * FROM countries WHERE id = $1';
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

// Get all countries
const getAllCountries = async () => {
  const query = 'SELECT * FROM countries';
  const { rows } = await db.query(query);
  return rows;
};

// Update a country by ID
const updateCountryById = async (id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setString = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
  const query = `UPDATE countries SET ${setString} WHERE id = $${keys.length + 1} RETURNING *`;
  const { rows } = await db.query(query, [...values, id]);
  return rows[0];
};

// Delete a country by ID
const deleteCountryById = async (id) => {
  await db.query('DELETE FROM countries WHERE id = $1', [id]);
  return { message: 'Country deleted successfully' };
};

module.exports = {
  createCountry,
  getCountryById,
  getAllCountries,
  updateCountryById,
  deleteCountryById,
};
