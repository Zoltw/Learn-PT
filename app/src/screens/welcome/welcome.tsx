import { Text, View } from 'react-native';
import { styles } from './styles';
import { StandardButton } from '../../components/Button/StandardButton';
import { useCallback, useEffect, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useTranslations } from '../../../../localization/useTranslations';
import { screenApp } from '../screens';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, screenApp.WELCOME>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const Welcome: React.FC<Props> = ({ navigation }) => {
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
      navigation.navigate(screenApp.AUTH_LOGIN);
    }
  }, [navigation]);

  const navigateToRegister = useCallback(() => {
    if (isMounted.current) {
      navigation.navigate(screenApp.AUTH_REGISTER);
    }
  }, [navigation]);

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
