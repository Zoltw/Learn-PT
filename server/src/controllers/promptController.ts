import { Request, Response } from 'express';
import { OpenAiService } from '../../src/services/openAiService';

export const sendPrompt = async (req: Request, res: Response) => {
  if (req === null) {
    return res.status(400).json('No prompt error');
  }
  const { prompt } = req.body;
  try {
    const openAiService = new OpenAiService(process.env.GPT_API_KEY, process.env.GPT_MODEL);
    const result = await openAiService.generateTextCompletion(prompt);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
