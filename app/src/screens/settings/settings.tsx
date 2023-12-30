import { Text, View } from 'react-native';
import { styles } from './styles';
import { StandardButton } from '../../components/Button/StandardButton';
import useTranslations from '../../hooks/useTranslations';
import { useCallback } from 'react';
import { clearMemory, removeHasSuccessfullyAuthenticated } from '../../storage/storage';
import * as Updates from 'expo-updates';

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
      <StandardButton text={translate('Logout')} blackButton={true} onPressFunction={Logout}/>
      <StandardButton text={translate('App reset')} blackButton={true} onPressFunction={Reset}/>
    </View>
  );
};


export default Settings;
