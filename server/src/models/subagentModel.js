const db = require('../config/dbConfig');

// Create a new subagent
const createSubagent = async (data) => {
  const query = `
    INSERT INTO subagents (name, payer_id, airtable_id) 
    VALUES ($1, $2, $3) RETURNING *
  `;
  const values = [data.name, data.payer_id, data.airtable_id];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Get a subagent by ID
const getSubagentById = async (id) => {
  const query = 'SELECT * FROM subagents WHERE id = $1';
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

// Get all subagents
const getAllSubagents = async () => {
  const query = 'SELECT * FROM subagents';
  const { rows } = await db.query(query);
  return rows;
};

// Update a subagent by ID
const updateSubagentById = async (id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setString = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
  const query = `UPDATE subagents SET ${setString} WHERE id = $${keys.length + 1} RETURNING *`;
  const { rows } = await db.query(query, [...values, id]);
  return rows[0];
};

// Delete a subagent by ID
const deleteSubagentById = async (id) => {
  await db.query('DELETE FROM subagents WHERE id = $1', [id]);
  return { message: 'Subagent deleted successfully' };
};

module.exports = {
  createSubagent,
  getSubagentById,
  getAllSubagents,
  updateSubagentById,
  deleteSubagentById,
};
