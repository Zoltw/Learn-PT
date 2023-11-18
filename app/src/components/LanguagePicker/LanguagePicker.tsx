import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import i18n from '../../../../localization/i18n';
import { styles } from './styles';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
];

export const LanguagePicker: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = useCallback((language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  }, []);

  return (
    <View style={styles.container}>
      {languages.map((language, index) => (
        <TouchableOpacity
          key={index}
          style={styles.languageItem}
          onPress={() => handleLanguageChange(language.code)}
        >
          <Text style={selectedLanguage === language.code ? styles.selectedText : styles.text}>
            {language.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

