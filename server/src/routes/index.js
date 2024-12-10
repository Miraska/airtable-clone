const express = require('express');
const agentRoutes = require('./agentRoutes');
const clientRoutes = require('./clientRoutes');
const orderRoutes = require('./orderRoutes');
const managerRoutes = require('./managerRoutes');
const reviewerRoutes = require('./reviewerRoutes');
const contractorRoutes = require('./contractorRoutes');
const subagentRoutes = require('./subagentRoutes');
const subagentPayerRoutes = require('./subagentPayerRoutes');
const countryRoutes = require('./countryRoutes');
const uploadRoutes = require('../routes/uploadRoutes');

const router = express.Router();

router.use('/agents', agentRoutes);
router.use('/clients', clientRoutes);
router.use('/orders', orderRoutes);
router.use('/managers', managerRoutes);
router.use('/reviewers', reviewerRoutes);
router.use('/contractors', contractorRoutes);
router.use('/subagents', subagentRoutes);
router.use('/subagent-payers', subagentPayerRoutes);
router.use('/countries', countryRoutes);
router.use('/', uploadRoutes);

module.exports = router;
