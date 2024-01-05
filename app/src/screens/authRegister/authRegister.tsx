import React, { useCallback } from 'react';
import Auth from '../../components/Auth/Auth';
import { formTypes } from '../../components/Form/types';
import { screenApp } from '../screens';
import { registerDisclaimer } from './variables';
import { navigate } from '../../root/navigator';
import { sendRegistrationUserDetails } from '../../api/user';

const AuthRegister: React.FC = () => {
  const performRegistration = useCallback(async (email: string, password: string, baseLanguage: string, repeatPassword: string) => {
    try {
      await sendRegistrationUserDetails(email, password, baseLanguage, repeatPassword);
    } catch (error) {
      console.error(error);
    } finally {
      navigate(screenApp.AUTH_LOGIN);
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
