import { Request, Response } from 'express';
import { OpenAiService } from '../../src/services/openAiService';
import * as userService from '../services/userService';
import { createPrompt } from '../utils/promptDetails';

export const sendPrompt = async (req: Request, res: Response) => {
  if (req === null) {
    return res.status(400).json('No prompt error');
  }
  const { userId } = req.params;
  try {
    const user = await userService.getUser(userId);
    const openAiService = new OpenAiService(process.env.GPT_API_KEY, process.env.GPT_MODEL);
    const unifiedPrompt = createPrompt(user);
    const result = await openAiService.generateTextCompletion(unifiedPrompt);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
