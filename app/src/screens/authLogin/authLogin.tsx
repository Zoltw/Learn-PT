import React, { useCallback } from 'react';
import Auth from '../../components/Auth/Auth';
import { formTypes } from '../../components/Form/types';
import { screenApp } from '../screens';
import { loginDisclaimer } from './variables';
import { useAuthProvider } from '../../context/AuthProvider';
import { navigate } from '../../root/navigator';
import {
  setHasSuccessfullyAuthenticated,
  setLanguageGoal,
  setLanguageGoalPickerSeenBefore,
  setLevelGoal,
  setLevelGoalPickerSeenBefore,
  setUserID } from '../../storage/storage';
import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';
import { fetchUserDetails } from '../../api/user';

const AuthLogin: React.FC = () => {
  const { setIsAuth } = useAuthProvider();

  const performLogin = useCallback(async (email: string, password: string) => {
    try {
      const { token, user } = await fetchUserDetails(email, password);
      await SecureStore.setItemAsync('jwt_token', token);
      setIsAuth(true);

      await Promise.all([
        setUserID(user._id),
        setHasSuccessfullyAuthenticated(),
        user.goal ? setLevelGoalPickerSeenBefore() && setLevelGoal(user.goal) : null,
        user.goalLanguage ? setLanguageGoalPickerSeenBefore && setLanguageGoal(user.goalLanguage) : null,
        Updates.reloadAsync(),
      ]);
    } catch (error) {
      console.error(error);
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

