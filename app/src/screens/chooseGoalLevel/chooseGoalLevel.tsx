import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { StandardButton } from '../../components/Button/StandardButton';
import { styles } from './styles';
import { screenApp } from '../screens';
import { setLevelGoalPickerSeenBefore } from '../../storage/storage';
import { navigate } from '../../root/navigator';
import LevelPicker from '../../components/LevelPicker/LevelPicker';
import useTranslations from '../../hooks/useTranslations';


const ChooseGoalLevel: React.FC = () => {
  const { translate } = useTranslations();
  const hasSeenLanguagePicker = useCallback(() => {
    setLevelGoalPickerSeenBefore();
    navigate(screenApp.DASHBOARD);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{translate('Choose your level')}</Text>
      <LevelPicker/>
      <StandardButton
        text={translate('Continue')}
        onPressFunction={hasSeenLanguagePicker} blackButton={true} />
    </View>
  );
};

export default ChooseGoalLevel;
