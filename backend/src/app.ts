import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { errors } from 'celebrate';
import { PORT, DB_ADDRESS } from './config';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';
import productRouter from './routes/product';
import orderRouter from './routes/order';

const app = express();
const BASE_ROOT = path.join(__dirname, '..');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger(BASE_ROOT));
app.use(express.static(path.join(BASE_ROOT, 'public')));
app.use('/product', productRouter);
app.use('/order', orderRouter);
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
