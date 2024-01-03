import { useCallback } from 'react';
import { navigate } from '../../root/navigator';
import { screenApp } from '../screens';

interface Question {
  word: string;
  answers: Array<string>;
  correctAnswer: string;
  known: boolean | null
}

// export const sendStatisticsToService = useCallback(async (knownWords, unknownWords) => {
//   try {
//     const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/statistics`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ knownWords, unknownWords }),
//     });

//     if (!response.ok) {
//       const responseData = await response.json();
//       throw new Error(responseData.message || 'Statistics POST failed');
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
//   // Send data to backend
// //   navigate(screenApp.SUMMARY, { knownWords, unknownWords });
// }, []);

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

    return response;
  } catch (error) {
    console.error(error.message);
  }
};
