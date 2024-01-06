export const fetchChatGPTResponseFromService = async (userId: string) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/chat/prompt/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message || 'Fetch chat gpt failed');
    }

    return response.json();
  } catch (error) {
    console.error(error.message);
  }
};

