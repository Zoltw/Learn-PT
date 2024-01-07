import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { StandardButton } from '../../components/Button/StandardButton';
import { screenApp } from '../screens';
import { setLanguageGoalPickerSeenBefore } from '../../storage/storage';
import { navigate } from '../../root/navigator';
import useTranslations from '../../hooks/useTranslations';
import { styles } from './style';
import LanguageGoalPicker from '../../components/LanguageGoalPicker/LanguageGoalPicker';


const ChooseGoalLanguage: React.FC = () => {
  const { translate } = useTranslations();
  const hasSeenLanguagePicker = useCallback(() => {
    setLanguageGoalPickerSeenBefore();
    navigate(screenApp.CHOOSE_GOAL_LEVEL);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{translate('Choose your goal')}</Text>
      <LanguageGoalPicker/>
      <StandardButton
        text={translate('Continue')}
        onPressFunction={hasSeenLanguagePicker} blackButton={true} />
    </View>
  );
};

export default ChooseGoalLanguage;
