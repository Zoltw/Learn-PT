import React, { useCallback } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import Auth from '../../components/Auth/Auth';
import { formTypes } from '../../components/Form/formTypes';
import { RootStackParamList } from '../../../../App';
import { screenApp } from '../screens';
import { loginDisclaimer } from './variables';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, screenApp.AUTH_LOGIN>;
};

const AuthLogin: React.FC<Props> = ({ navigation }) => {
  const performLogin = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(`http://192.168.100.23:8080/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || 'Registration failed');
      }

      navigation.navigate(screenApp.AUTH_LOGIN);
    } catch (error) {
      console.error(error.message);
    }
  }, [navigation]);

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
