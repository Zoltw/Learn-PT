import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import useTranslations from '../../hooks/useTranslations';
import { setLanguageGoalPickerSeenBefore } from '../../storage/storage';
import { Languages } from './languages';
import useGoalLanguage from '../../hooks/useGoalLanguage';

const LanguageGoalPicker: React.FC = () => {
  const { translate } = useTranslations();
  const { selectedGoal, handleGoalChange } = useGoalLanguage();

  const languages = [
    { name: translate(Languages.ENGLISH) },
    { name: translate(Languages.POLISH) },
    { name: translate(Languages.GERMAN) },
    { name: translate(Languages.ITALIAN) },
    { name: translate(Languages.SPANISH) },
    { name: translate(Languages.FRENCH) },
  ];

  const handleLanguagesPicker = useCallback((language) => {
    setLanguageGoalPickerSeenBefore();
    handleGoalChange(language);
  }, [handleGoalChange]);

  return (
    <View style={styles.languagesContainer}>
      {languages.map((language, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.languageItem,
            selectedGoal === language.name && styles.selectedLanguageItem,
          ]}
          onPress={() => handleLanguagesPicker(language.name)}
        >
          <Text style={selectedGoal === language.name ? styles.selectedText : styles.text}>
            {language.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LanguageGoalPicker;
