import { Response, NextFunction } from 'express';

export const errorHandler = (err: any, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
  });
  next();
};
