import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import BadRequestError from '../errors/BadRequestError';
import Product from '../models/product';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { total, items } = req.body;

  try {
    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return next(new BadRequestError('Один или несколько товаров не найдены'));
    }

    const unsellableProducts = products.filter((product) => product.price === null);
    if (unsellableProducts.length > 0) {
      return next(new BadRequestError('Некоторые товары не продаются'));
    }

    const calculatedTotal = products.reduce((sum, product) => sum + (product.price || 0), 0);

    if (calculatedTotal !== total) {
      return next(new BadRequestError('Сумма заказа не соответствует стоимости товаров'));
    }

    return res.status(201).json({ id: faker.string.uuid(), total });
  } catch (error) {
    return next(error);
  }
};

export default createOrder;
