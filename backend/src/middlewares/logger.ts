import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';

export const requestLogger = (baseRoot: string) => expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(baseRoot, 'request.log'),
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = (baseRoot: string) => expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(baseRoot, 'error.log'),
    }),
  ],
  format: winston.format.json(),
});
