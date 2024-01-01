import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import useLanguage from '../../hooks/useLanguage';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polski' },
];

const LanguagePicker: React.FC = () => {
  const { selectedLanguage, handleLanguageChange } = useLanguage();

  return (
    <View style={styles.languagesContainer}>
      {languages.map((language, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.languageItem,
            selectedLanguage === language.code && styles.selectedLanguageItem,
          ]}
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

export default LanguagePicker;
