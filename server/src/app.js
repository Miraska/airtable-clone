const express = require('express');
const requestRoutes = require('./routes/requestRoutes.js');
const syncService = require('./services/syncService.js');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', requestRoutes);

syncService.syncAirtableToDB();

module.exports = app;
