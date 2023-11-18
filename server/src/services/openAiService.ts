import { OpenAI } from 'openai';
import { config } from 'dotenv';
import { ChatCompletion } from 'openai/resources/chat/completions';

type CompletionRequest = OpenAI.Chat.ChatCompletionCreateParamsNonStreaming;

config();

export class OpenAiService {
    private openai: OpenAI;
    private defaultParameters: Omit<CompletionRequest, 'messages'>;

    constructor(apiKey: string | undefined, model: string | undefined) {
        if (!apiKey || !model) {
            throw new Error('API Key and Model must be provided');
        }
    
        this.openai = new OpenAI({ apiKey });
        this.defaultParameters = {
            model,
            max_tokens: 20,
            temperature: 0.35,
            top_p: 1,
            n: 1,
            stream: false,
            frequency_penalty: 0,
            presence_penalty: 0,
        };
    }

    private extractFirstChoiceText(response: ChatCompletion): string | null {
        return response.choices[0]?.message.content ?? null;
    }

    async generateTextCompletion(prompt: string, overrides: Partial<CompletionRequest> = {}): Promise<string | null> {
        const response = await this.openai.chat.completions.create({
            ...this.defaultParameters,
            ...overrides,
            messages: [{
                role: "user", 
                content: prompt
            }]
        });

        return this.extractFirstChoiceText(response);
    }
}
