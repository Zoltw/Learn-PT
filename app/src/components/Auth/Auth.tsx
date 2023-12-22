import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useTranslations } from '../../../../localization/useTranslations';
import Form from '../../components/Form/form';
import { formTypes } from '../../components/Form/formTypes';
import { styles } from './styles';
import { screenApp } from '../../screens/screens';

type AuthNavigationProp = StackNavigationProp<RootStackParamList, screenApp.AUTH_LOGIN | screenApp.AUTH_REGISTER>;

interface AuthProps {
  type: formTypes;
  navigation: AuthNavigationProp;
  onNavigate: () => void;
  alternateNavigate: () => void;
  alternateText: string;
}

const Auth: React.FC<AuthProps> = ({ type, navigation, onNavigate, alternateNavigate, alternateText }) => {
  const { translate } = useTranslations();
  const isMounted = useRef(true);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const isFormFilled = type === formTypes.REGISTER ?
    email !== '' && password !== '' && repeatPassword !== '' :
    email !== '' && password !== '';

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = useCallback(() => {
    if (isFormFilled && isMounted.current) {
      onNavigate();
    }
  }, [isFormFilled, onNavigate]);

  return (
    <View style={styles.container}>
      <Form
        emailValue={email}
        passwordValue={password}
        repeatPasswordValue={repeatPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        setRepeatPassword={setRepeatPassword}
        type={type}
      />
      <TouchableOpacity
        style={[styles.button, !isFormFilled && styles.buttonDisabled]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>{translate('NEXT')}</Text>
      </TouchableOpacity>
      <Text style={styles.loginPrompt}>
        {translate(alternateText)}
        {' '}
        <Text
          style={styles.loginText}
          onPress={alternateNavigate}>{type === formTypes.REGISTER ? translate('Log in') : translate('Sign up')}
        </Text>
      </Text>
    </View>
  );
};

export default Auth;
