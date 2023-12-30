import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '../app/src/context/AuthProvider';
import LoadingScreen from '../app/src/screens/loading/loading';
import { getHasSuccessfullyAuthenticated, getLanguage } from '../app/src/storage/storage';
import i18n from '../localization/i18n';
import { Route } from './navTypes';
import { PostAuthFlow, PreAuthFlow } from './navigation';
import { navigationRef } from './navigator';


const RootStack = createStackNavigator();


const Root: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeApp() {
      try {
        const authStatus = await getHasSuccessfullyAuthenticated();
        setIsAuth(authStatus);

        const selectedLanguage = await getLanguage();
        i18n.changeLanguage(selectedLanguage);
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => initializeApp(), 500);
  }, [setIsAuth]);


  if (isAuth === null || isLoading) {
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
