import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import 'express-async-errors';
import { pagination } from 'typeorm-pagination';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(pagination);
// route to get users avatar
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError)
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333! 🏆');
});
