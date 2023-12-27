import React, { useCallback } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import Auth from '../../components/Auth/Auth';
import { formTypes } from '../../components/Form/types';
import { RootStackParamList } from '../../../../App';
import { screenApp } from '../screens';
import { loginDisclaimer } from './variables';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, screenApp.AUTH_LOGIN>;
};

const AuthLogin: React.FC<Props> = ({ navigation }) => {
  const performLogin = useCallback(async (email: string, password: string): Promise<Response> => {
    try {
      const response = await fetch(`http://localhost:8080/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error('Login failed');
        }
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return (
    <Auth
      type={formTypes.LOGIN}
      onNavigate={() => navigation.navigate(screenApp.LEARNING_SCREEN)}
      performAction={performLogin}
      alternateNavigate={() => navigation.navigate(screenApp.AUTH_REGISTER)}
      alternateText={loginDisclaimer}
    />
  );
};

export default AuthLogin;
