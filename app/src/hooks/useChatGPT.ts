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

export const useChatGPT = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: '',
        },
        body: JSON.stringify({ prompt: query }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const values = useMemo(() => ({
    response, error, isLoading, sendRequest,
  }), [response, error, isLoading, sendRequest]);

  return values;
};

