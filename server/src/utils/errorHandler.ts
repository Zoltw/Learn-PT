import { NextFunction, Response } from 'express';
import { Request } from 'express-jwt';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
  } else {
    next(err);
  }
};
