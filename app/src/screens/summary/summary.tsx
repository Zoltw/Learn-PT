import { useCallback } from 'react';
import useTranslations from '../../hooks/useTranslations';
import { removeHasSuccessfullyAuthenticated } from '../../storage/storage';
import { StandardButton } from '../../components/Button/StandardButton';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { navigate } from '../../../../rootNav/navigator';
import { screenApp } from '../screens';

const Summary: React.FC = () => {
  const { translate } = useTranslations();

  const Logout = useCallback(async () => {
    navigate(screenApp.DASHBOARD);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Summarajsy</Text>
      <StandardButton text={translate('Back to dashboard')} blackButton={true} onPressFunction={Logout}/>
    </View>
  );
};


export default Summary;
