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

  const Logout = useCallback(async () => {
    await Promise.all([
      removeHasSuccessfullyAuthenticated(),
      Updates.reloadAsync(),
    ]);
  }, []);

  const Reset = useCallback(async () => {
    await Promise.all([
      clearMemory(),
      Updates.reloadAsync(),
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Setingsy</Text>
      <LevelPicker/>
      <Text>Setingsy</Text>
      <LanguagePicker />
      <StandardButton text={translate('Logout')} blackButton={true} onPressFunction={Logout}/>
      <Button title={translate('App reset')} onPress={Reset} color={'red'} />
    </View>
  );
};


export default Settings;
