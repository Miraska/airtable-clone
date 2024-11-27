const db = require('../config/dbConfig');

// Create a new client
const createClient = async (data) => {
  const query = `
    INSERT INTO clients (name, inn, airtable_id) 
    VALUES ($1, $2, $3) RETURNING *
  `;
  const values = [data.name, data.inn, data.airtable_id];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Get a client by ID
const getClientById = async (id) => {
  const query = 'SELECT * FROM clients WHERE id = $1';
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

// Get all clients
const getAllClients = async () => {
  const query = 'SELECT * FROM clients';
  const { rows } = await db.query(query);
  return rows;
};

// Update a client by ID
const updateClientById = async (id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setString = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
  const query = `UPDATE clients SET ${setString} WHERE id = $${keys.length + 1} RETURNING *`;
  const { rows } = await db.query(query, [...values, id]);
  return rows[0];
};

// Delete a client by ID
const deleteClientById = async (id) => {
  await db.query('DELETE FROM clients WHERE id = $1', [id]);
  return { message: 'Client deleted successfully' };
};

module.exports = {
  createClient,
  getClientById,
  getAllClients,
  updateClientById,
  deleteClientById,
};
