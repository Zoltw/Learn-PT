import { useCallback, useState } from 'react';
import { getHasSuccessfullyAuthenticated, getUserID, setLanguage } from '../storage/storage';
import i18n from '../../../localization/i18n';

const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);

  const sendUserLanguages = useCallback(async (baseLanguage: string, userId: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/baseLanguage/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ baseLanguage }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Send language failed');
    }

    return response.json();
  }, []);

  const handleLanguageChange = useCallback(async (baseLanguage: string) => {
    setSelectedLanguage(baseLanguage);
    await setLanguage(baseLanguage);
    const [isAuth, userId] = await Promise.all([getHasSuccessfullyAuthenticated(), getUserID()]);
    i18n.changeLanguage(baseLanguage);
    if (isAuth) {
      await sendUserLanguages(baseLanguage, userId);
    }
  }, [sendUserLanguages]);

  return { selectedLanguage, handleLanguageChange };
};

export default useLanguage;
