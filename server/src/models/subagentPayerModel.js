const db = require('../config/dbConfig');

// Create a new subagent payer
const createSubagentPayer = async (data) => {
  const query = `
    INSERT INTO subagent_payers (name, airtable_id) 
    VALUES ($1, $2) RETURNING *
  `;
  const values = [data.name, data.airtable_id];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Get a subagent payer by ID
const getSubagentPayerById = async (id) => {
  const query = 'SELECT * FROM subagent_payers WHERE id = $1';
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

// Get all subagent payers
const getAllSubagentPayers = async () => {
  const query = 'SELECT * FROM subagent_payers';
  const { rows } = await db.query(query);
  return rows;
};

// Update a subagent payer by ID
const updateSubagentPayerById = async (id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setString = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
  const query = `UPDATE subagent_payers SET ${setString} WHERE id = $${keys.length + 1} RETURNING *`;
  const { rows } = await db.query(query, [...values, id]);
  return rows[0];
};

// Delete a subagent payer by ID
const deleteSubagentPayerById = async (id) => {
  await db.query('DELETE FROM subagent_payers WHERE id = $1', [id]);
  return { message: 'Subagent payer deleted successfully' };
};

module.exports = {
  createSubagentPayer,
  getSubagentPayerById,
  getAllSubagentPayers,
  updateSubagentPayerById,
  deleteSubagentPayerById,
};
