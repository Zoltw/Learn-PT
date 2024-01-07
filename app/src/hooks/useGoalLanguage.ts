import { useCallback, useEffect, useState } from 'react';
import { getLanguageGoal, getUserID, setLanguageGoal } from '../storage/storage';
import { sendUserGoalLanguage } from '../api/user';
import { Languages } from '../components/LanguageGoalPicker/languages';

const useGoalLanguage = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>(null);

  useEffect(() => {
    const fetchInitialGoal = async () => {
      setSelectedGoal(await getLanguageGoal() || Languages.ENGLISH);
    };

    fetchInitialGoal();
  }, []);

  const handleGoalChange = useCallback(async (language: string) => {
    if (language !== selectedGoal) {
      await setLanguageGoal(language);
      const [result, userId] = await Promise.all([getLanguageGoal(), getUserID()]);
      setSelectedGoal(result);
      await sendUserGoalLanguage(result, userId);
    }
  }, [selectedGoal]);

  return { selectedGoal, handleGoalChange };
};

export default useGoalLanguage;
