import { useCallback, useEffect, useState } from 'react';
import { getGoal, getUserID, setGoal } from '../storage/storage';
import { level } from '../components/LevelPicker/languageLevels';

const useLevel = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>(null);

  useEffect(() => {
    const fetchInitialLevel = async () => {
      setSelectedLevel(await getGoal() || level.A1);
    };

    fetchInitialLevel();
  }, []);

  const handleLevelChange = useCallback(async (level: string) => {
    if (level !== selectedLevel) {
      await setGoal(level);
      const [result, userId] = await Promise.all([getGoal(), getUserID()]);
      setSelectedLevel(result);
      await sendUserLevel(result, userId);
    }
  }, [selectedLevel]);


  const sendUserLevel = async (goal: string, userId: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/level/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ goal }),
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
