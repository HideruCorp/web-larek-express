import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(BASE_PATH);
  console.log('Адрес ресурсов:', path.join(__dirname, 'public'));
});
