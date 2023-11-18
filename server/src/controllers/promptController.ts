import { Request, Response } from "express";
import { OpenAiService } from "../../src/services/openAiService";

export const sendPrompt = async (req: Request, res: Response) => {
    const openAiService = new OpenAiService(process.env.GPT_API_KEY, process.env.GPT_MODEL);
    const result = await openAiService.generateTextCompletion('Napisz mi wierszyk');
    console.log(result);
}