import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import ConflictError from '../errors/ConflictError';
import BadRequestError from '../errors/BadRequestError';
import Product from '../models/product';

export const getAllProducts = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    return res.json({ items: products, total: products.length });
  } catch (error) {
    return next(error);
  }
};
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(`Некорректные данные при создании товара: ${error.message}`));
    }
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Такой товар уже существует'));
    }
    return next(error);
  }
};
