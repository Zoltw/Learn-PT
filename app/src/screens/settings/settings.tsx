import { Text, View } from 'react-native';
import { styles } from './styles';
import { StandardButton } from '../../components/Button/StandardButton';
import useTranslations from '../../hooks/useTranslations';
import { useCallback } from 'react';
import { removeHasSuccessfullyAuthenticated } from '../../storage/storage';
import * as Updates from 'expo-updates';

const Settings: React.FC = () => {
  const { translate } = useTranslations();

  const Logout = useCallback(async () => {
    await removeHasSuccessfullyAuthenticated();
    await Updates.reloadAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Setingsy</Text>
      <StandardButton text={translate('Logout')} blackButton={true} onPressFunction={Logout}/>
    </View>
  );
};


export default Settings;
