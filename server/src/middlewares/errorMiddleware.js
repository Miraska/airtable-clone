const { body, validationResult } = require('express-validator');

const validateRequest = [
  body('request_number').notEmpty().withMessage('Request number is required'),
  body('manager_id').isNumeric().withMessage('Manager ID must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateRequest,
};
