import { Request, Response } from 'express';
import * as userService from '../services/userService';
import * as statisticsService from '../services/statisticsService';
import { UserInterface } from '../models/user';
import jwt from 'jsonwebtoken';

type userType = Promise<Response<string, Record<string, string>> | undefined>;
type LanguageCode = keyof typeof languageMapping;

const languageMapping = {
  pl: { basedLanguage: 'Polish', goalLanguage: 'English' },
  en: { basedLanguage: 'English', goalLanguage: 'Polish' },
};

export const createUser = async (req: Request, res: Response): userType => {
  const userData: UserInterface & { passwordConfirmation: string } = req.body;
  if (userData.password !== userData.passwordConfirmation) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  try {
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
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

    const token = jwt.sign({ userId: user }, `${process.env.JWT_KEY}`, { expiresIn: '1h' });
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

export const updateUserGoal = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { goal } = req.body;

  try {
    const updatedUser = await userService.updateUserGoal(userId, goal);
    if (updatedUser) {
      res.json('ok');
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error || 'Internal Server Error' });
  }
};

export const updateUserLanguages = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { baseLanguage } = req.body;

  try {
    const { basedLanguage, goalLanguage } = languageMapping[baseLanguage as LanguageCode] || { basedLanguage: 'English', goalLanguage: 'Polish' };
    const updatedUser = await userService.updateUserLanguage(userId, basedLanguage, goalLanguage);
    if (updatedUser) {
      res.json('ok');
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error || 'Internal Server Error' });
  }
};

export const updateUserWords = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { knownWords, unknownWords } = req.body;

  try {
    const updatedUser = await userService.updateUserWords(userId, knownWords, unknownWords);
    if (updatedUser) {
      res.json('ok');
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error || 'Internal Server Error' });
  }
};

export const getAllUserStats = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const stats = await statisticsService.getUserStats(userId);
    res.json(stats);
  } catch (error) {
    if (error === 'User not found') {
      res.status(404).json({ message: error });
    } else {
      res.status(500).json({ message: 'Error fetching user statistics', error });
    }
  }
};


