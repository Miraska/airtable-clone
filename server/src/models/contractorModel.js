const db = require("../config/dbConfig");

// Create a new contractor
const createContractor = async (data) => {
  const query = `
    INSERT INTO contractors (name, airtable_id) 
    VALUES ($1, $2) RETURNING *
  `;
  const values = [data.name, data.airtable_id];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Get a contractor by ID
const getContractorById = async (id) => {
  const query = "SELECT * FROM contractors WHERE id = $1";
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

// Get all contractors
const getAllContractors = async () => {
  const query = "SELECT * FROM contractors";
  const { rows } = await db.query(query);
  return rows;
};

// Update a contractor by ID
const updateContractorById = async (id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setString = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
  const query = `UPDATE contractors SET ${setString} WHERE id = $${
    keys.length + 1
  } RETURNING *`;
  const { rows } = await db.query(query, [...values, id]);
  return rows[0];
};

// Delete a contractor by ID
const deleteContractorById = async (id) => {
  await db.query("DELETE FROM contractors WHERE id = $1", [id]);
  return { message: "Contractor deleted successfully" };
};

module.exports = {
  createContractor,
  getContractorById,
  getAllContractors,
  updateContractorById,
  deleteContractorById,
};
