import { Text, View } from 'react-native';
import { styles } from './styles';
import { StandardButton } from '../../components/Button/StandardButton';
import { useCallback, useEffect, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useTranslations } from '../../../../localization/useTranslations';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

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
      {/* {/* <StandardButton text={translate('Sign in')} onPressFunction={navigateToLogin}/> */}
      <View style={styles.container}>
        <Text style={styles.title}>LearnPT</Text>
        <Text style={styles.subtitle}>Your AI Teacher</Text>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </TouchableOpacity> */}
          <StandardButton text={translate('Sign in')} blackButton={false} onPressFunction={navigateToLogin}/>
          <StandardButton text={translate('Register')} blackButton={true} onPressFunction={navigateToRegister}/>
          {/* <TouchableOpacity style={[styles.button, styles.buttonRegister]}>
            <Text style={[styles.buttonText, styles.buttonTextRegister]}>REGISTER</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};


export default Welcome;
