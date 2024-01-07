import { Request, Response } from 'express';
import * as userService from '../services/userService';
import * as statisticsService from '../services/statisticsService';
import { UserInterface } from '../models/user';
import jwt from 'jsonwebtoken';

type userType = Promise<Response<string, Record<string, string>> | undefined>;
type LanguageKey = 'pl' | 'en';

const languageMapping: Record<LanguageKey, { basedLanguage: string }> = {
  pl: { basedLanguage: 'Polish' },
  en: { basedLanguage: 'English' },
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
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;
  try {
    const user = await userService.getUser(userId);
    res.status(200).json(user);
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
      res.status(200);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error || 'Internal Server Error' });
  }
};

export const updateUserBaseLanguage = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { baseLanguage } = req.body;

  try {
    if (!(baseLanguage in languageMapping)) {
      res.status(400).json({ message: 'Invalid base language' });
      return;
    }

    const { basedLanguage } = languageMapping[baseLanguage as LanguageKey];
    const updatedUser = await userService.updateUserBaseLanguage(userId, basedLanguage);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error || 'Internal Server Error' });
  }
};

export const updateUserGoalLanguage = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const { goalLanguage } = req.body;

  try {
    const updatedUser = await userService.updateUserGoalLanguage(userId, goalLanguage);
    if (updatedUser) {
      res.status(200);
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
    statisticsService.updateUserLessonStats(userId);
    if (updatedUser) {
      res.status(200);
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
    res.status(200).json(stats);
  } catch (error) {
    if (error === 'User not found') {
      res.status(404).json({ message: error });
    } else {
      res.status(500).json({ message: 'Error fetching user statistics', error });
    }
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    await userService.deleteUser(userId);
    res.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error || 'Internal Server Error' });
  }
};

