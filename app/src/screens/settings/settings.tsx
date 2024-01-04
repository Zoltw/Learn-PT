import { Button, ScrollView, Text } from 'react-native';
import { styles } from './styles';
import { StandardButton } from '../../components/Button/StandardButton';
import useTranslations from '../../hooks/useTranslations';
import { useCallback } from 'react';
import { clearMemory, getUserID, removeGoal, removeHasSuccessfullyAuthenticated } from '../../storage/storage';
import * as Updates from 'expo-updates';
import LanguagePicker from '../../components/LanguagePicker/LanguagePicker';
import LevelPicker from '../../components/LevelPicker/LevelPicker';

const Settings: React.FC = () => {
  const { translate } = useTranslations();

  const userLogout = useCallback(async () => {
    await Promise.all([
      removeHasSuccessfullyAuthenticated(),
      Updates.reloadAsync(),
    ]);
  }, []);

  const applicationReset = useCallback(async () => {
    await Promise.all([
      clearMemory(),
      Updates.reloadAsync(),
    ]);
  }, []);

  const deleteAccount = useCallback(async () => {
    try {
      const userId = await getUserID();
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Send level failed');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
    await Promise.all([
      removeHasSuccessfullyAuthenticated(),
      removeGoal(),
      Updates.reloadAsync(),
    ]);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.text}>{translate('Change your goal')}</Text>
      <LevelPicker/>
      <Text style={styles.text}>{translate('Change your language')}</Text>
      <LanguagePicker />
      <StandardButton text={translate('Logout')} blackButton={true} onPressFunction={userLogout}/>
      <Button title={translate('Delete Account')} onPress={deleteAccount} color={'red'} />
      <Button title={translate('App reset')} onPress={applicationReset} color={'red'} />
    </ScrollView>
  );
};


export default Settings;
