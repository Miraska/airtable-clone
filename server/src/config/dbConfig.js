const { Pool } = require('pg');
const { DB } = require('./appConfig');

const pool = new Pool(DB);

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
