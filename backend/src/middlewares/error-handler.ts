import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  return res.status(statusCode).json({ message });
};

export default errorHandler;
