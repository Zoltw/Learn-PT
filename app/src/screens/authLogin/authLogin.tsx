import { Button, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useTranslations } from '../../../../localization/useTranslations';
import Form from '../../components/Form/form';
import { formTypes } from '../../components/Form/formTypes';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthLogin'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const AuthLogin: React.FC<Props> = ({ navigation }) => {
  const isMounted = useRef(true);
  const { translate } = useTranslations();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const navigateToLearningScreen = useCallback(() => {
    if (isMounted.current) {
      navigation.navigate('LearningScreen');
    }
  }, [navigation]);

  const navigateToRegister = useCallback(() => {
    if (isMounted.current) {
      navigation.navigate('AuthRegister');
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Form
        emailValue={email}
        passwordValue={password}
        setEmail={setEmail}
        setPassword={setPassword}
        type={formTypes.LOGIN}
      />
      <TouchableOpacity style={styles.button} onPress={navigateToLearningScreen}>
        <Text style={styles.buttonText}>{translate('NEXT')}</Text>
      </TouchableOpacity>

      <Text style={styles.loginPrompt}>
        {translate('or try to')} <Text style={styles.loginText} onPress={navigateToRegister}>{translate('sign up')}</Text>
      </Text>
    </View>
  );
};


export default AuthLogin;
