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
        <Stack.Screen name="ChooseLanguage" component={ChooseLanguage} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="AuthLogin" component={isAuth ? Dashboard : AuthLogin} />
        <Stack.Screen name="AuthRegister" component={AuthRegister} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="LearningScreen" component={LearningScreen} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
