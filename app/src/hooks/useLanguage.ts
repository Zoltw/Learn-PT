import { useCallback, useState } from 'react';
import { getHasSuccessfullyAuthenticated, getUserID, setLanguage } from '../storage/storage';
import i18n from '../localization/i18n';
import { sendUserLanguages } from '../api/user';

const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);

  const handleLanguageChange = useCallback(async (baseLanguage: string) => {
    setSelectedLanguage(baseLanguage);
    await setLanguage(baseLanguage);
    const [isAuth, userId] = await Promise.all([getHasSuccessfullyAuthenticated(), getUserID()]);
    if (isAuth) {
      sendUserLanguages(baseLanguage, userId);
    }
    i18n.changeLanguage(baseLanguage);
  }, []);

  return { selectedLanguage, handleLanguageChange };
};

export default useLanguage;
