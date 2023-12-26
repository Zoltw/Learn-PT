import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslations } from '../../../../localization/useTranslations';
import Form from '../../components/Form/form';
import { formTypes } from '../../components/Form/formTypes';
import { styles } from './styles';
import useAuthState from '../../hooks/useAuthState';


interface AuthProps {
  type: formTypes;
  onNavigate: () => void;
  performAction: (email: string, password: string, repeatPassword?: string) => Promise<void>;
  alternateNavigate: () => void;
  alternateText: string;
}

const Auth: React.FC<AuthProps> = ({ type, onNavigate, performAction, alternateNavigate, alternateText }) => {
  const { translate } = useTranslations();
  const {
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    isFormFilled,
    handleSubmit,
  } = useAuthState(type, performAction, onNavigate);

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
        disabled={!isFormFilled}
      >
        <Text style={styles.buttonText}>{translate('NEXT')}</Text>
      </TouchableOpacity>
      <Text style={styles.loginPrompt}>
        {translate(alternateText)}{' '}
        <Text style={styles.loginText} onPress={alternateNavigate}>
          {type === formTypes.REGISTER ? translate('Log in') : translate('Sign up')}
        </Text>
      </Text>
    </View>
  );
};

export default Auth;
