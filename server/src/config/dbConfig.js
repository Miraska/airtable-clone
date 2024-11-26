require("dotenv").config();
const { Pool } = require("pg");

// Конфигурация для подключения к базе данных
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 8080,
});

const checkDatabaseConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database connected:", res.rows[0]);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

checkDatabaseConnection();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
