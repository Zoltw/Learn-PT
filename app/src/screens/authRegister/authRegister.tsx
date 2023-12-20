import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RootStackParamList } from '../../../../App';
import { useTranslations } from '../../../../localization/useTranslations';
import Form from '../../components/Form/form';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthRegister'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};


const AuthRegister: React.FC<Props> = ({ navigation }) => {
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <View style={styles.container}>
      <Form
        emailValue={email}
        passwordValue={password}
        repeatPasswordValue={repeatPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        setRepeatPassword={setRepeatPassword}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{translate('NEXT')}</Text>
      </TouchableOpacity>

      <Text style={styles.loginPrompt}>
        or try to <Text style={styles.loginText}>login in</Text>
      </Text>
    </View>
  );
};


export default AuthRegister;

