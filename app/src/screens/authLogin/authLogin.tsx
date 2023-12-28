import React, { useCallback } from 'react';
import Auth from '../../components/Auth/Auth';
import { formTypes } from '../../components/Form/types';
import { screenApp } from '../screens';
import { loginDisclaimer } from './variables';
import { useAuthProvider } from '../../context/AuthProvider';
import { navigate } from '../../../../rootNav/navigator';
import { setHasSuccessfullyAuthenticated } from '../../storage/storage';

const AuthLogin: React.FC = () => {
  const { setIsAuth } = useAuthProvider();
  const performLogin = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        await setHasSuccessfullyAuthenticated();
        setIsAuth(true);
      } else {
        throw new Error('Login failed');
      }
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
