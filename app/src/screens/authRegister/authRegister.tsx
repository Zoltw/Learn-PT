import React, { useCallback } from 'react';
import Auth from '../../components/Auth/Auth';
import { formTypes } from '../../components/Form/types';
import { screenApp } from '../screens';
import { registerDisclaimer } from './variables';
import { navigate } from '../../../../rootNav/navigator';

const AuthRegister: React.FC = () => {
  const performRegistration = useCallback(async (email: string, password: string, repeatPassword: string) => {
    if (password !== repeatPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/register`, {
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
      navigate(screenApp.AUTH_LOGIN);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return (
    <Auth
      type={formTypes.REGISTER}
      performAction={performRegistration}
      alternateNavigate={() => navigate(screenApp.AUTH_LOGIN)}
      alternateText={registerDisclaimer}
    />
  );
};

export default AuthRegister;
