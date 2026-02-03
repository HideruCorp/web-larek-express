import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, DB_ADDRESS } from './config';
import errorHandler from './middlewares/error';
import productRouter from './routes/product';
import orderRouter from './routes/order';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use(errorHandler);

mongoose.connect(DB_ADDRESS);

const server = app.listen(PORT, () => {
  const addr = server.address();
  if (typeof addr === 'object' && addr) {
    const host = addr.address === '::' ? 'localhost' : addr.address;
    console.log(`Сервер запущен: http://${host}:${addr.port}`);
  }
});
