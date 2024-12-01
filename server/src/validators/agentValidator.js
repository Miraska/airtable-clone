const { check } = require('express-validator');

const validateAgent = [
  check('name')
    .notEmpty()
    .withMessage('Имя обязательно для заполнения')
    .isString()
    .withMessage('Имя должно быть строкой'),
  check('order')
    .optional()
    .isArray()
    .withMessage('Заказ должен быть массивом идентификаторов')
];

module.exports = validateAgent;
