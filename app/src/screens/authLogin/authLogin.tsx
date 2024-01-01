import React, { useCallback } from 'react';
import Auth from '../../components/Auth/Auth';
import { formTypes } from '../../components/Form/types';
import { screenApp } from '../screens';
import { loginDisclaimer } from './variables';
import { useAuthProvider } from '../../context/AuthProvider';
import { navigate } from '../../root/navigator';
import { setHasSuccessfullyAuthenticated, setUserIDToStorage } from '../../storage/storage';
import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';

const AuthLogin: React.FC = () => {
  const { setIsAuth } = useAuthProvider();

  const fetchUserDetails = async (email: string, password: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  };

  const performLogin = useCallback(async (email: string, password: string) => {
    try {
      const { token, user } = await fetchUserDetails(email, password);
      await SecureStore.setItemAsync('jwt_token', token);
      setIsAuth(true);

      await Promise.all([
        setUserIDToStorage(user._id),
        setHasSuccessfullyAuthenticated(),
        Updates.reloadAsync(),
      ]);
    } catch (error) {
      console.error(error.message);
    }
  }, [setIsAuth]);

  return (
    <Auth
      type={formTypes.LOGIN}
      performAction={performLogin}
      alternateNavigate={() => navigate(screenApp.AUTH_REGISTER)}
      alternateText={loginDisclaimer}
    />
  );
};

export default AuthLogin;

