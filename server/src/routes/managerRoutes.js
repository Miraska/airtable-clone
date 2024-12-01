const express = require('express');
const { getAllManagers, getManagerById, createManager, updateManager, deleteManager } = require('../controllers/managerController');

const router = express.Router();

router.get('/', getAllManagers);
router.get('/:id', getManagerById);
router.post('/', createManager);
router.put('/:id', updateManager);
router.delete('/:id', deleteManager);

module.exports = router;
