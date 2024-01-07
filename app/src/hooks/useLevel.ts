import { useCallback, useEffect, useState } from 'react';
import { getLevelGoal, getUserID, setLevelGoal } from '../storage/storage';
import { level } from '../components/LevelPicker/languageLevels';
import { sendUserLevel } from '../api/user';

const useLevel = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>(null);

  useEffect(() => {
    const fetchInitialLevel = async () => {
      setSelectedLevel(await getLevelGoal() || level.A1);
    };

    fetchInitialLevel();
  }, []);

  const handleLevelChange = useCallback(async (level: string) => {
    if (level !== selectedLevel) {
      await setLevelGoal(level);
      const [result, userId] = await Promise.all([getLevelGoal(), getUserID()]);
      setSelectedLevel(result);
      await sendUserLevel(result, userId);
    }
  }, [selectedLevel]);

  return { selectedLevel, handleLevelChange };
};

export default useLevel;
