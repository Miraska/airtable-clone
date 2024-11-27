const express = require('express');
const cors = require('cors');
const requestRoutes = require('./routes/requestRoutes');
const managerRoutes = require('./routes/managerRoutes');
const agentRoutes = require('./routes/agentRoutes');
const contractorRoutes = require('./routes/contractorRoutes');
const clientRoutes = require('./routes/clientRoutes');
const subagentRoutes = require('./routes/subagentRoutes');
const subagentPayerRoutes = require('./routes/subagentPayerRoutes');
const countryRoutes = require('./routes/countryRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Apply routes
app.use('/api/requests', requestRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/contractors', contractorRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/subagents', subagentRoutes);
app.use('/api/subagent-payers', subagentPayerRoutes);
app.use('/api/countries', countryRoutes);

// Export the app for server startup
module.exports = app;
