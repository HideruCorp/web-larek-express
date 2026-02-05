import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { errors } from 'celebrate';
import { PORT, DB_ADDRESS } from './config';
import { requestLogger, errorLogger } from './middlewares/logger';
import NotFoundError from './errors/NotFoundError';
import errorHandler from './middlewares/error-handler';
import productRouter from './routes/product';
import orderRouter from './routes/order';

const app = express();
const BASE_ROOT = path.join(__dirname, '..');

app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 60,
});
app.use(limiter);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger(BASE_ROOT));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use((_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errorLogger(BASE_ROOT));
app.use(errors());
app.use(errorHandler);

mongoose.connect(DB_ADDRESS);

const server = app.listen(PORT, () => {
  const addr = server.address();
  if (typeof addr === 'object' && addr) {
    const host = addr.address === '::' ? 'localhost' : addr.address;
    console.log(`Сервер запущен: http://${host}:${addr.port}`);
  }
});
