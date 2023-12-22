import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RootStackParamList } from '../../../../App';
import { useTranslations } from '../../../../localization/useTranslations';
import Form from '../../components/Form/form';
import { formTypes } from '../../components/Form/formTypes';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthRegister'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};


const AuthRegister: React.FC<Props> = ({ navigation }) => {
  const isMounted = useRef(true);
  const { translate } = useTranslations();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

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

  const createAccountNavigateToLogin = useCallback(() => {
    if (isMounted.current) {
      navigation.navigate('AuthLogin');
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Form
        emailValue={email}
        passwordValue={password}
        repeatPasswordValue={repeatPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        setRepeatPassword={setRepeatPassword}
        type={formTypes.REGISTER}
      />
      <TouchableOpacity style={styles.button} onPress={createAccountNavigateToLogin}>
        <Text style={styles.buttonText}>{translate('NEXT')}</Text>
      </TouchableOpacity>

      <Text style={styles.loginPrompt}>
        {translate('or try to')} <Text style={styles.loginText} onPress={navigateToLogin}>{translate('log in')}</Text>
      </Text>
    </View>
  );
};


export default AuthRegister;

