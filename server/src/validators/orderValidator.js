const { check } = require('express-validator');

const validateOrder = [
  check('status')
    .notEmpty()
    .withMessage('Статус обязателен для заполнения')
    .isString()
    .withMessage('Статус должен быть строкой'),
  
  check('order_number')
    .notEmpty()
    .withMessage('Номер заявки обязателен')
    .isInt()
    .withMessage('Номер заявки должен быть числом'),

  check('sum_order')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Сумма заявки должна быть положительным числом'),

  check('customer_name')
    .notEmpty()
    .withMessage('Имя клиента обязательно')
    .isString()
    .withMessage('Имя клиента должно быть строкой'),
  
  check('customer_email')
    .notEmpty()
    .withMessage('Электронная почта клиента обязательна')
    .isEmail()
    .withMessage('Электронная почта должна быть валидной'),
];

module.exports = validateOrder;
