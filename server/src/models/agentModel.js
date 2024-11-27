const db = require('../config/dbConfig');

// Create a new agent
const createAgent = async (data) => {
  const query = `
    INSERT INTO agents (name, airtable_id) 
    VALUES ($1, $2) RETURNING *
  `;
  const values = [data.name, data.airtable_id];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Get an agent by ID
const getAgentById = async (id) => {
  const query = 'SELECT * FROM agents WHERE id = $1';
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

// Get all agents
const getAllAgents = async () => {
  const query = 'SELECT * FROM agents';
  const { rows } = await db.query(query);
  return rows;
};

// Update an agent by ID
const updateAgentById = async (id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setString = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
  const query = `UPDATE agents SET ${setString} WHERE id = $${keys.length + 1} RETURNING *`;
  const { rows } = await db.query(query, [...values, id]);
  return rows[0];
};

// Delete an agent by ID
const deleteAgentById = async (id) => {
  await db.query('DELETE FROM agents WHERE id = $1', [id]);
  return { message: 'Agent deleted successfully' };
};

module.exports = {
  createAgent,
  getAgentById,
  getAllAgents,
  updateAgentById,
  deleteAgentById,
};
