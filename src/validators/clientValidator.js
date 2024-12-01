const { check } = require('express-validator');

const validateClient = [
  check('name')
    .notEmpty()
    .withMessage('Наименование клиента обязательно для заполнения')
    .isString()
    .withMessage('Имя должно быть строкой'),
  check('inn')
    .optional()
    .isNumeric()
    .withMessage('ИНН должен быть числом'),
  check('order')
    .optional()
    .isArray()
    .withMessage('Заказы должны быть массивом ID')
];

module.exports = validateClient;
