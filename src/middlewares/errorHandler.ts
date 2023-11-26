import { Request, NextFunction, Response } from 'express';
import { ResponseError } from 'utils/responseError';

export const errorHandler = async (
  error: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  res.status(error.statusCode).json(error.message);
};