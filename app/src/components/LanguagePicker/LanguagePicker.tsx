import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import useLanguage from '../../hooks/useLanguage';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
];

export const LanguagePicker: React.FC = () => {
  const { selectedLanguage, handleLanguageChange } = useLanguage();

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

