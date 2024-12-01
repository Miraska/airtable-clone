module.exports = {
    PORT: process.env.PORT || 5000,
    DB: {
      USER: process.env.PG_USER,
      HOST: process.env.PG_HOST,
      DATABASE: process.env.PG_DATABASE,
      PASSWORD: process.env.PG_PASSWORD,
      PORT: process.env.PG_PORT || 8080,
    }
  };
  