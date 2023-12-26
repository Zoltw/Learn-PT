import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { UserInterface } from '../models/user';
import jwt from 'jsonwebtoken';

type userType = Promise<Response<string, Record<string, string>> | undefined>;

export const createUser = async (req: Request, res: Response): userType => {
  const userData: UserInterface & { passwordConfirmation: string } = req.body;
  if (userData.password !== userData.passwordConfirmation) {
    console.log(userData.password);
    console.log(userData.passwordConfirmation);
    console.log('dupa1');
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  try {
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.log('dupa2');
    res.status(400).json({ message: error });
  }
};

export const loginUser = async (req: Request, res: Response): userType => {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user }, '647570616A616E61', { expiresIn: '1h' });
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;
  try {
    const user = await userService.getUser(userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
