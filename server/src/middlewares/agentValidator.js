const { check } = require('express-validator');

const validateAgent = [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),
];

module.exports = validateAgent;
