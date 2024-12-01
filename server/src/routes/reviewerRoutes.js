const express = require('express');
const { getAllReviewers, getReviewerById, createReviewer, updateReviewer, deleteReviewer } = require('../controllers/reviwerController');

const router = express.Router();

router.get('/', getAllReviewers);
router.get('/:id', getReviewerById);
router.post('/', createReviewer);
router.put('/:id', updateReviewer);
router.delete('/:id', deleteReviewer);

module.exports = router;
