import { Button, Text, View } from 'react-native';
import { styles } from './styles';
import { StandardButton } from '../../components/Button/StandardButton';
import useTranslations from '../../hooks/useTranslations';
import { useCallback } from 'react';
import { clearMemory, removeHasSuccessfullyAuthenticated } from '../../storage/storage';
import * as Updates from 'expo-updates';
import LanguagePicker from '../../components/LanguagePicker/LanguagePicker';
import LevelPicker from '../../components/LevelPicker/LevelPicker';

const Settings: React.FC = () => {
  const { translate } = useTranslations();

  const userLogout = useCallback(async () => {
    await Promise.all([
      removeHasSuccessfullyAuthenticated(),
      Updates.reloadAsync(),
    ]);
  }, []);

  const applicationReset = useCallback(async () => {
    await Promise.all([
      clearMemory(),
      Updates.reloadAsync(),
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{translate('Change your goal')}</Text>
      <LevelPicker/>
      <Text style={styles.textCont}>{translate('Change your language')}</Text>
      <LanguagePicker />
      <StandardButton text={translate('Logout')} blackButton={true} onPressFunction={userLogout}/>
      <Button title={translate('App reset')} onPress={applicationReset} color={'red'} />
    </View>
  );
};


export default Settings;
