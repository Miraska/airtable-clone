require('./config/dotenv');
const http = require('http');
const app = require('./app');
const { PORT } = require('./config/appConfig');
const sequelize = require('./db/connection');

// Импортируем и инициализируем ассоциации между моделями
const { associateModels } = require('./models/associations');
associateModels();

// Проверяем подключение к базе данных и запускаем сервер
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Завершаем процесс, если не удается подключиться к базе данных
  });
