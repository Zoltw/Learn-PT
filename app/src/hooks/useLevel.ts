import { useCallback, useEffect, useState } from 'react';
import { getGoal, getUserID, setGoal } from '../storage/storage';
import { level } from '../components/LevelPicker/languageLevels';
import { sendUserLevel } from '../api/user';

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

  return { selectedLevel, handleLevelChange };
};

export default useLevel;
