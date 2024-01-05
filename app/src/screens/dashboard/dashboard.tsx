import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import LoadingScreen from '../loading/loading';
import useTranslations from '../../hooks/useTranslations';
import { StandardButton } from '../../components/Button/StandardButton';
import { navigate } from '../../root/navigator';
import { screenApp } from '../screens';
import { getUserID } from '../../storage/storage';
import { fetchDashboardDetails } from '../../api/user';

const Dashboard: React.FC = () => {
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { translate } = useTranslations();

  const fetchUserStats = useCallback(async () => {
    try {
      setLoading(true);
      const userId = await getUserID();
      const data = await fetchDashboardDetails(userId);
      setUserStats(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const learnAction = useCallback(() => {
    navigate(screenApp.LEARNING_SCREEN);
  }, []);

  useEffect(() => {
    fetchUserStats();
  }, [fetchUserStats]);

  if (loading) {
    return <LoadingScreen/>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {userStats ? (
        <>
          <Text style={styles.title}>{translate('Statistics')}</Text>
          <View style={styles.fieldsContainer}>
            <Text style={styles.stat}>
              {`${translate('Session Count:')} ${userStats.sessionCount ?? '0'}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Total Time Spent:')} ${userStats.totalTimeSpent ?? '0'} ${translate('minutes')}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Known Words Count:')} ${userStats.knownWords.length ?? '0'}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Unknown Words Count:')} ${userStats.unknownWords.length ?? '0'}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Average Performance:')} ${userStats.averagePerformance ?? '0'}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Current Streak:')} ${userStats.streak ?? '0'} ${translate('days')}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Last Session Date:')} ${userStats.date ?? new Date().toDateString()}`}
            </Text>
          </View>
          <StandardButton text={translate('Learn!')} blackButton={false} onPressFunction={learnAction} />
        </>
      ) : <Text style={styles.error}>{translate('We have a problem. Please try later')}</Text>}
    </ScrollView>
  );
};

export default Dashboard;
