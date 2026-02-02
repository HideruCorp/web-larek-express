import AppError from './AppError';

export default class BadRequestError extends AppError {
  constructor(message: string = 'Ошибка валидации данных') {
    super(message, 400);
  }
}
