import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import LanguagePicker from '../../components/LanguagePicker/LanguagePicker';
import { StandardButton } from '../../components/Button/StandardButton';
import { styles } from './styles';
import { screenApp } from '../screens';
import { setLanguagePickerSeenBefore } from '../../storage/storage';
import { navigate } from '../../root/navigator';
import useTranslations from '../../hooks/useTranslations';

const ChooseAppLanguage: React.FC = () => {
  const { translate } = useTranslations();
  const hasSeenLanguagePicker = useCallback(() => {
    setLanguagePickerSeenBefore();
    navigate(screenApp.WELCOME);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{translate('Choose your language for learning')}</Text>
      <LanguagePicker />
      <StandardButton
        text={translate('Continue')}
        onPressFunction={hasSeenLanguagePicker} blackButton={true} />
    </View>
  );
};

export default ChooseAppLanguage;
