import React, { useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useTranslations from '../../hooks/useTranslations';
import Form from '../../components/Form/form';
import { formTypes, inputTypes } from '../Form/types';
import { styles } from './styles';
import useAuthState from '../../hooks/useAuthState';

interface AuthProps {
  type: formTypes;
  performAction: (email: string, password: string, baseLanguage?: string, repeatPassword?: string) => Promise<void>;
  alternateNavigate: () => void;
  alternateText: string;
}

const Auth: React.FC<AuthProps> = ({ type, performAction, alternateNavigate, alternateText }) => {
  const { translate } = useTranslations();
  const [errors, setErrors] = useState({ email: '', password: '', repeatPassword: '' });
  const {
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    isFormFilled,
    handleSubmit,
  } = useAuthState(type, performAction, errors);

  const emailRegex: RegExp = useMemo(() => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, []);
  const passwordRegex: RegExp = useMemo(() => /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$/, []);

  const validationMessage = {
    email: translate('Invalid email address'),
    password: translate('Password must be at least 7 characters long, include a number and an uppercase letter'),
    passwordMatch: translate('Passwords do not match'),
  };

  const handleFieldChange = useCallback((field: string, value: string) => {
    switch (field) {
      case inputTypes.EMAIL:
        setEmail(value);
        const isEmailValid = emailRegex.test(value);
        setErrors((prevErrors) => ({ ...prevErrors, email: isEmailValid ? '' : validationMessage.email }));
        break;

      case inputTypes.PASSWORD:
        setPassword(value);
        const isPasswordValid = passwordRegex.test(value);
        setErrors((prevErrors) => (
          { ...prevErrors, password: isPasswordValid ? '' : validationMessage.password }
        ));

        if (type === formTypes.REGISTER && repeatPassword) {
          const isRepeatPasswordValid = value === repeatPassword;
          setErrors((prevErrors) => ({ ...prevErrors, repeatPassword: isRepeatPasswordValid ? '' : validationMessage.passwordMatch }));
        }
        break;

      case inputTypes.REPEAT_PASSWORD:
        setRepeatPassword?.(value);
        if (type === formTypes.REGISTER) {
          const isRepeatPasswordValid = value === password;
          setErrors((prevErrors) => ({ ...prevErrors, repeatPassword: isRepeatPasswordValid ? '' : validationMessage.passwordMatch }));
        }
        break;

      default:
        break;
    }
  }, [
    emailRegex,
    password,
    passwordRegex,
    repeatPassword,
    setEmail,
    setPassword,
    setRepeatPassword,
    type,
    validationMessage.email,
    validationMessage.password,
    validationMessage.passwordMatch,
  ]);


  return (
    <View style={styles.container}>
      <Form
        emailValue={email}
        passwordValue={password}
        repeatPasswordValue={repeatPassword}
        onFieldChange={handleFieldChange}
        errors={errors}
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
