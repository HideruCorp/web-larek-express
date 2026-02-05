import AppError from './AppError';

export default class NotFoundError extends AppError {
  constructor(message: string = 'Данные не найдены') {
    super(message, 404);
  }
}
