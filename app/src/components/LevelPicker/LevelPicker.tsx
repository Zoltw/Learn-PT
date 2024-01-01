import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import useTranslations from '../../hooks/useTranslations';
import useLevel from '../../hooks/useLevel';
import { setGoalPickerSeenBefore } from '../../storage/storage';
import { level } from './languageLevels';

const LevelPicker: React.FC = () => {
  const { translate } = useTranslations();
  const { selectedLevel, handleLevelChange } = useLevel();

  const languageLevel = [
    { level: level.A1, name: translate('A1 - Discoverer') },
    { level: level.A2, name: translate('A2 - Explorer') },
    { level: level.B1, name: translate('B1 - Conversationalist') },
    { level: level.B2, name: translate('B2 - Navigator') },
    { level: level.C1, name: translate('C1 - Articulator') },
    { level: level.C2, name: translate('C2 - Master') },
  ];

  const handleLevelPicker = useCallback((level) => {
    setGoalPickerSeenBefore();
    handleLevelChange(level);
  }, [handleLevelChange]);

  return (
    <View style={styles.languagesContainer}>
      {languageLevel.map((language, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.languageItem,
            selectedLevel === language.level && styles.selectedLanguageItem,
          ]}
          onPress={() => handleLevelPicker(language.level)}
        >
          <Text style={selectedLevel === language.level ? styles.selectedText : styles.text}>
            {language.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LevelPicker;
