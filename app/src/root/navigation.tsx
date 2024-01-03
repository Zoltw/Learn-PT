import React from 'react';
import { getGoalPickerSeenBefore, getLanguagePickerSeenBefore } from '../storage/storage';
import { SettingsHeaderButton } from '../components/Button/SettingsHeaderButton';
import { SettingsHeaderBackButton } from '../components/Button/SettingsHeaderBackButton';
import { createStackNavigator } from '@react-navigation/stack';
import { screenApp } from '../screens/screens';
import Welcome from '../screens/welcome/welcome';
import AuthLogin from '../screens/authLogin/authLogin';
import AuthRegister from '../screens/authRegister/authRegister';
import Dashboard from '../screens/dashboard/dashboard';
import LearningScreen from '../screens/learningScreen/learningScreen';
import Settings from '../screens/settings/settings';
import ChooseLanguage from '../screens/chooseLanguage/chooseLanguage';
import Summary from '../screens/summary/summary';
import LoadingScreen from '../screens/loading/loading';
import ChooseGoal from '../screens/chooseGoal/chooseGoal';
import { useAsyncInitState } from '../hooks/useAsyncInitState';

const PreAuthNavigatorStack = createStackNavigator();

export const PreAuthFlow = () => {
  const isLanguagePickerSeenBefore = useAsyncInitState(getLanguagePickerSeenBefore);

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
  const isGoalPickerSeenBefore = useAsyncInitState(getGoalPickerSeenBefore);

  if (isGoalPickerSeenBefore === null) {
    return <LoadingScreen/>;
  }

  return (
    <PostAuthNavigatorStack.Navigator
      screenOptions={{
        headerShown: true,
        title: null,
        gestureEnabled: false,
        cardOverlayEnabled: true,
      }}
      initialRouteName={isGoalPickerSeenBefore ? screenApp.DASHBOARD : screenApp.CHOOSE_GOAL}
    >
      {!isGoalPickerSeenBefore && <PostAuthNavigatorStack.Screen name={screenApp.CHOOSE_GOAL} component={ChooseGoal} options={{
        headerLeft: () => <></>,
      }}/>}
      <PostAuthNavigatorStack.Screen name={screenApp.DASHBOARD} component={Dashboard} options={{
        headerLeft: () => <></>,
        headerRight: () => (
          <SettingsHeaderButton/>
        ),
      }}/>
      <PostAuthNavigatorStack.Screen name={screenApp.LEARNING_SCREEN} component={LearningScreen} options={{
        headerLeft: () => <></>,
      }}/>
      <PostAuthNavigatorStack.Screen name={screenApp.SUMMARY} component={Summary} options={{
        headerLeft: () => <></>,
      }}/>
      <PostAuthNavigatorStack.Screen name={screenApp.SETTINGS} component={Settings} options={{
        headerLeft: () => (
          <SettingsHeaderBackButton/>
        ),
      }} />
    </PostAuthNavigatorStack.Navigator>
  );
};
