import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './app/src/screens/welcome/welcome';
import Dashboard from './app/src/screens/dashboard/dashboard';
import AuthLogin from './app/src/screens/authLogin/authLogin';
import LearningScreen from './app/src/screens/learningScreen/learningScreen';
import AuthRegister from './app/src/screens/authRegister/authRegister';
import Settings from './app/src/screens/settings/settings';
import ChooseLanguage from './app/src/screens/chooseLanguage/chooseLanguage';
import { screenApp } from './app/src/screens/screens';

export type RootStackParamList = {
  ChooseLanguage: undefined;
  Welcome: undefined;
  AuthLogin: undefined;
  AuthRegister: undefined;
  Dashboard: undefined;
  LearningScreen: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const isAuth: boolean = false;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
        }}
      >
        <Stack.Screen name={screenApp.CHOOSE_LANGUAGE} component={ChooseLanguage} />
        <Stack.Screen name={screenApp.WELCOME} component={Welcome} />
        <Stack.Screen name={screenApp.AUTH_REGISTER} component={AuthRegister} />
        <Stack.Screen name={screenApp.AUTH_LOGIN} component={isAuth ? Dashboard : AuthLogin} />
        <Stack.Screen name={screenApp.DASHBOARD} component={Dashboard} />
        <Stack.Screen name={screenApp.LEARNING_SCREEN} component={LearningScreen} />
        <Stack.Screen name={screenApp.SETTINGS} component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
