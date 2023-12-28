import { Text, View } from 'react-native';
import { styles } from './styles';
import { StandardButton } from '../../components/Button/StandardButton';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslations } from '../../../../localization/useTranslations';
import { screenApp } from '../screens';
import { navigate } from '../../../../rootNav/navigator';

const Welcome: React.FC = () => {
  const isMounted = useRef(true);
  const { translate } = useTranslations();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const navigateToLogin = useCallback(() => {
    if (isMounted.current) {
      navigate(screenApp.AUTH_LOGIN);
    }
  }, []);

  const navigateToRegister = useCallback(() => {
    if (isMounted.current) {
      navigate(screenApp.AUTH_REGISTER);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LearnPT</Text>
      <Text style={styles.subtitle}>{translate('Your AI Teacher')}</Text>
      <View style={styles.buttonContainer}>
        <StandardButton text={translate('Sign in')} blackButton={false} onPressFunction={navigateToLogin}/>
        <StandardButton text={translate('Register')} blackButton={true} onPressFunction={navigateToRegister}/>
      </View>
    </View>
  );
};


export default Welcome;
