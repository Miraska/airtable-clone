const express = require('express');
const requestRoutes = require('./routes/requestRoutes.js');
const syncService = require('./services/syncService.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Применение маршрутов
app.use('/api/requests', requestRoutes);

// Запуск синхронизации
syncService.syncAll();

module.exports = app;
