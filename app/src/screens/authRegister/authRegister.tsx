import React, { useCallback } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import Auth from '../../components/Auth/Auth';
import { formTypes } from '../../components/Form/types';
import { RootStackParamList } from '../../../../App';
import { screenApp } from '../screens';
import { registerDisclaimer } from './variables';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, screenApp.AUTH_REGISTER>;
};

const AuthRegister: React.FC<Props> = ({ navigation }) => {
  const performRegistration = useCallback(async (email: string, password: string, repeatPassword: string) => {
    if (password !== repeatPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/v1/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, passwordConfirmation: repeatPassword }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Registration failed');
      }
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return (
    <Auth
      type={formTypes.REGISTER}
      onNavigate={() => navigation.navigate(screenApp.AUTH_LOGIN)}
      performAction={performRegistration}
      alternateNavigate={() => navigation.navigate(screenApp.AUTH_LOGIN)}
      alternateText={registerDisclaimer}
    />
  );
};

export default AuthRegister;
