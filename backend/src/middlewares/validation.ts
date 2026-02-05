import { celebrate, Joi, Segments } from 'celebrate';

export const validateProductBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля "title" - 2',
        'string.max': 'Максимальная длина поля "title" - 30',
        'any.required': 'Поле "title" должно быть заполнено',
      }),
    image: Joi.object({
      fileName: Joi.string().min(1).required(),
      originalName: Joi.string().min(1).required(),
    }).required()
      .messages({
        'any.required': 'Поле "image" должно быть заполнено',
      }),
    category: Joi.string().required()
      .messages({
        'any.required': 'Поле "category" должно быть заполнено',
      }),
    description: Joi.string().max(512).allow('').optional(),
    price: Joi.number().positive().allow(null).optional()
      .messages({
        'number.positive': 'Цена должна быть положительным числом',
      }),
  }),
});

export const validateOrderBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required()
      .messages({
        'any.only': 'Неверный способ оплаты. Доступны: card, online',
        'any.required': 'Поле "payment" должно быть заполнено',
      }),
    email: Joi.string().email({ tlds: false }).required()
      .messages({
        'string.email': 'Некорректный email',
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    phone: Joi.string().pattern(/^\+?[\d\s\-()]{10,18}$/).required()
      .messages({
        'string.pattern.base': 'Некорректный формат номера телефона',
        'any.required': 'Поле "phone" должно быть заполнено',
      }),
    address: Joi.string().required()
      .messages({
        'any.required': 'Поле "address" должно быть заполнено',
      }),
    total: Joi.number().positive().required()
      .messages({
        'number.positive': 'Сумма заказа должна быть положительным числом',
        'any.required': 'Поле "total" должно быть заполнено',
      }),
    items: Joi.array().items(Joi.string().length(24).hex()).min(1)
      .required()
      .messages({
        'array.min': 'Список товаров не может быть пустым',
        'any.required': 'Поле "items" должно быть заполнено',
        'string.length': 'Некорректный идентификатор товара',
        'string.hex': 'Некорректный идентификатор товара',
      }),
  }),
});
