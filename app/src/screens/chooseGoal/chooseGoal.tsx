import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { StandardButton } from '../../components/Button/StandardButton';
import { styles } from './styles';
import { screenApp } from '../screens';
import { setLanguagePickerSeenBefore } from '../../storage/storage';
import { navigate } from '../../root/navigator';
import LevelPicker from '../../components/LevelPicker/LevelPicker';
import useTranslations from '../../hooks/useTranslations';


const ChooseGoal: React.FC = () => {
  const { translate } = useTranslations();
  const hasSeenLanguagePicker = useCallback(() => {
    setLanguagePickerSeenBefore();
    navigate(screenApp.DASHBOARD);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{translate('Choose your goal')}</Text>
      <LevelPicker/>
      <StandardButton
        text={'Continue'}
        onPressFunction={hasSeenLanguagePicker} blackButton={true} />
    </View>
  );
};

export default ChooseGoal;
