import React from 'react';
import { getLanguageGoalPickerSeenBefore, getLanguagePickerSeenBefore, getLevelGoalPickerSeenBefore } from '../storage/storage';
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
import ChooseAppLanguage from '../screens/chooseAppLanguage/chooseAppLanguage';
import Summary from '../screens/summary/summary';
import LoadingScreen from '../screens/loading/loading';
import { useAsyncInitState } from '../hooks/useAsyncInitState';
import ChooseGoalLanguage from '../screens/chooseGoalLanguage/chooseGoalLanguage';
import ChooseGoalLevel from '../screens/chooseGoalLevel/chooseGoalLevel';

const PreAuthNavigatorStack = createStackNavigator();

export const PreAuthFlow = () => {
  const isLanguageAppPickerSeenBefore = useAsyncInitState(getLanguagePickerSeenBefore);

  if (isLanguageAppPickerSeenBefore === null) {
    return <LoadingScreen/>;
  }

  return (
    <PreAuthNavigatorStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardOverlayEnabled: true,
      }}
    >
      {!isLanguageAppPickerSeenBefore && <PreAuthNavigatorStack.Screen name={screenApp.CHOOSE_APP_LANGUAGE} component={ChooseAppLanguage} />}
      <PreAuthNavigatorStack.Screen name={screenApp.WELCOME} component={Welcome} />
      <PreAuthNavigatorStack.Screen name={screenApp.AUTH_LOGIN} component={AuthLogin} />
      <PreAuthNavigatorStack.Screen name={screenApp.AUTH_REGISTER} component={AuthRegister} />
    </PreAuthNavigatorStack.Navigator>
  );
};

const PostAuthNavigatorStack = createStackNavigator();

export const PostAuthFlow = () => {
  const isLevelGoalPickerSeenBefore = useAsyncInitState(getLevelGoalPickerSeenBefore);
  const isLanguageGoalPickerSeenBefore = useAsyncInitState(getLanguageGoalPickerSeenBefore);

  if (isLevelGoalPickerSeenBefore === null || isLanguageGoalPickerSeenBefore === null) {
    return <LoadingScreen/>;
  }

  return (
    <PostAuthNavigatorStack.Navigator
      screenOptions={{
        title: null,
        headerShown: true,
        gestureEnabled: false,
        cardOverlayEnabled: true,
      }}
    >
      {!isLanguageGoalPickerSeenBefore && !isLevelGoalPickerSeenBefore &&
      <>
        <PostAuthNavigatorStack.Screen name={screenApp.CHOOSE_GOAL_LANGUAGE} component={ChooseGoalLanguage} options={{
          headerLeft: () => <></>,
        }} />
        <PostAuthNavigatorStack.Screen name={screenApp.CHOOSE_GOAL_LEVEL} component={ChooseGoalLevel} options={{
          headerLeft: () => <></>,
        }} />
      </>}
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
