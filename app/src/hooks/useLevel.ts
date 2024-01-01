import { useCallback, useState } from 'react';
import { setGoal } from '../storage/storage';

const useLevel = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>(null);

  const handleLevelChange = useCallback(async (level: string) => {
    setSelectedLevel(level);
    await setGoal(level);
    await sendUserLevel(level);
  }, []);

  const sendUserLevel = async (level: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/level`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Send level failed');
    }

    return response.json();
  };

  return { selectedLevel, handleLevelChange };
};

export default useLevel;
