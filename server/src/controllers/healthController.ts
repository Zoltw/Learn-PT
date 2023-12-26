import { Response } from 'express';

export const getHealth = (res: Response) => {
  return res.status(200).json('ok');
};
