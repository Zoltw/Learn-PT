// useLanguage.js
import { useCallback, useState } from 'react';
import { setLanguage } from '../storage/storage';
import i18n from '../../../localization/i18n';

const useLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);

  const handleLanguageChange = useCallback(async (language: string) => {
    setSelectedLanguage(language);
    await setLanguage(language);
    i18n.changeLanguage(language);
  }, []);

  return { selectedLanguage, handleLanguageChange };
};

export default useLanguage;
