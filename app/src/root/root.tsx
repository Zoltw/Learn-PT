import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '../context/AuthProvider';
import LoadingScreen from '../screens/loading/loading';
import { getHasSuccessfullyAuthenticated, getLanguage } from '../storage/storage';
import i18n from '../../../localization/i18n';
import { Route } from './navTypes';
import { PostAuthFlow, PreAuthFlow } from './navigation';
import { navigationRef } from './navigator';
import { useAsyncInitState } from '../hooks/useAsyncInitState';

const RootStack = createStackNavigator();

const Root: React.FC = () => {
  const initStates = useAsyncInitState(async () => {
    const authStatus = await getHasSuccessfullyAuthenticated();
    const language = await getLanguage();
    return { authStatus, language };
  });

  const isAuth = initStates?.authStatus;
  const selectedLanguage = initStates?.language;

  useEffect(() => {
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

  if (isAuth === undefined || isAuth === null) {
    return (
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name={Route.LOADING} component={LoadingScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true, cardOverlayEnabled: true }}>
          {isAuth ? (
            <RootStack.Screen name={Route.AUTHED} component={PostAuthFlow} />
          ) : (
            <RootStack.Screen name={Route.UNAUTHED} component={PreAuthFlow} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default Root;
