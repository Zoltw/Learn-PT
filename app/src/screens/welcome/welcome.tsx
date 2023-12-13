import { View } from 'react-native';
import { styles } from './styles';
import { StandardButton } from '../../components/Button/StandardButton';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const Welcome: React.FC<Props> = ({ navigation }) => {
  const isMounted = useRef(true);
  const { t } = useTranslation();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const navigateToLogin = useCallback(() => {
    if (isMounted.current) {
      navigation.navigate('AuthLogin');
    }
  }, [navigation]);

  const navigateToRegister = useCallback(() => {
    if (isMounted.current) {
      navigation.navigate('AuthRegister');
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StandardButton text={t('Sign in')} onPressFunction={navigateToLogin}/>
      <StandardButton text={t('Register')} onPressFunction={navigateToRegister}/>
    </View>
  );
};


export default Welcome;
