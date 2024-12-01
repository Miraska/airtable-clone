const { reviewerService } = require('../services');

const getAllReviewers = async (req, res) => {
  try {
    const reviewers = await reviewerService.getAll();
    res.json(reviewers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviewerById = async (req, res) => {
  try {
    const reviewer = await reviewerService.getById(req.params.id);
    if (reviewer) {
      res.json(reviewer);
    } else {
      res.status(404).json({ error: 'Reviewer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReviewer = async (req, res) => {
  try {
    const newReviewer = await reviewerService.create(req.body);
    res.status(201).json(newReviewer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReviewer = async (req, res) => {
  try {
    const updatedReviewer = await reviewerService.update(req.params.id, req.body);
    if (updatedReviewer) {
      res.json(updatedReviewer);
    } else {
      res.status(404).json({ error: 'Reviewer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReviewer = async (req, res) => {
  try {
    const deletedReviewer = await reviewerService.delete(req.params.id);
    if (deletedReviewer) {
      res.json({ message: 'Reviewer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Reviewer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReviewers,
  getReviewerById,
  createReviewer,
  updateReviewer,
  deleteReviewer,
};
