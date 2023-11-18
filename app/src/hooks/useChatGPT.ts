import { useCallback, useMemo, useState } from 'react';

interface GPTResponse {
  text: string;
}

interface GPT {
  response: GPTResponse | null;
  error: Error | null;
  isLoading: boolean;
  sendRequest: (query: string) => Promise<void>;
}

export const useChatGPT = () => {};

