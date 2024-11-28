const express = require('express');
const agentRoutes = require('./agentRoutes');
const clientRoutes = require('./clientRoutes');
const orderRoutes = require('./orderRoutes');
const managerRoutes = require('./managerRoutes');
const contractorRoutes = require('./contractorRoutes');
const subagentRoutes = require('./subagentRoutes');
const subagentPayerRoutes = require('./subagentPayerRoutes');
const countryRoutes = require('./countryRoutes');

const router = express.Router();

router.use('/agents', agentRoutes);
router.use('/clients', clientRoutes);
router.use('/orders', orderRoutes);
router.use('/managers', managerRoutes);
router.use('/contractors', contractorRoutes);
router.use('/subagents', subagentRoutes);
router.use('/subagent-payers', subagentPayerRoutes);
router.use('/countries', countryRoutes);

module.exports = router;
