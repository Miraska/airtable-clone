require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
});

const checkDatabaseConnection = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    process.exit(1);
  }
};

checkDatabaseConnection();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
