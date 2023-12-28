import { createStackNavigator } from '@react-navigation/stack';
import { screenApp } from '../app/src/screens/screens';
import Welcome from '../app/src/screens/welcome/welcome';
import AuthLogin from '../app/src/screens/authLogin/authLogin';
import AuthRegister from '../app/src/screens/authRegister/authRegister';
import Dashboard from '../app/src/screens/dashboard/dashboard';
import LearningScreen from '../app/src/screens/learningScreen/learningScreen';
import Settings from '../app/src/screens/settings/settings';
import ChooseLanguage from '../app/src/screens/chooseLanguage/chooseLanguage';
import { useEffect, useState } from 'react';
import { getLanguagePickerSeenBefore } from '../app/src/storage/storage';
import LoadingScreen from '../app/src/screens/loading/loading';

const PreAuthNavigatorStack = createStackNavigator();

export const PreAuthFlow = () => {
  const [isLanguagePickerSeenBefore, setIsLanguagePickerSeenBefore] = useState<boolean | null>(null);
  useEffect(() => {
    const checkLanguagePickerStatus = async () => {
      const langPickerStatus = await getLanguagePickerSeenBefore();
      setIsLanguagePickerSeenBefore(langPickerStatus);
    };
    checkLanguagePickerStatus();
  }, []);

  if (isLanguagePickerSeenBefore === null) {
    return <LoadingScreen/>;
  }

  return (
    <PreAuthNavigatorStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}
    >
      {!isLanguagePickerSeenBefore && <PreAuthNavigatorStack.Screen name={screenApp.CHOOSE_LANGUAGE} component={ChooseLanguage} />}
      <PreAuthNavigatorStack.Screen name={screenApp.WELCOME} component={Welcome} />
      <PreAuthNavigatorStack.Screen name={screenApp.AUTH_LOGIN} component={AuthLogin} />
      <PreAuthNavigatorStack.Screen name={screenApp.AUTH_REGISTER} component={AuthRegister} />
    </PreAuthNavigatorStack.Navigator>
  );
};

const PostAuthNavigatorStack = createStackNavigator();

export const PostAuthFlow = () => {
  return (
    <PostAuthNavigatorStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
      }}
      initialRouteName={screenApp.LEARNING_SCREEN}
    >
      <PostAuthNavigatorStack.Screen name={screenApp.DASHBOARD} component={Dashboard} />
      <PostAuthNavigatorStack.Screen name={screenApp.LEARNING_SCREEN} component={LearningScreen} />
      <PostAuthNavigatorStack.Screen name={screenApp.SETTINGS} component={Settings} />
    </PostAuthNavigatorStack.Navigator>
  );
};
