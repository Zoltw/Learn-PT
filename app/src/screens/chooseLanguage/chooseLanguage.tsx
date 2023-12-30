import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import LanguagePicker from '../../components/LanguagePicker/LanguagePicker';
import { StandardButton } from '../../components/Button/StandardButton';
import { styles } from './styles';
import { screenApp } from '../screens';
import { setLanguagePickerSeenBefore } from '../../storage/storage';
import { navigate } from '../../root/navigator';

const ChooseLanguage: React.FC = () => {
  const hasSeenLanguagePicker = useCallback(() => {
    setLanguagePickerSeenBefore();
    navigate(screenApp.WELCOME);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Choose your language</Text>
      <LanguagePicker />
      <StandardButton
        text={'Continue'}
        onPressFunction={hasSeenLanguagePicker} blackButton={true} />
    </View>
  );
};

export default ChooseLanguage;
