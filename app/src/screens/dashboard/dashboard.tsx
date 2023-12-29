import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import LoadingScreen from '../loading/loading';
import useTranslations from '../../hooks/useTranslations';
import { StandardButton } from '../../components/Button/StandardButton';
import { navigate } from '../../../../rootNav/navigator';
import { screenApp } from '../screens';

const fetchMockUserStats = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userId: userId,
        sessionCount: Math.floor(Math.random() * 100),
        totalTimeSpent: Math.floor(Math.random() * 500),
        knownWordsCount: Math.floor(Math.random() * 1000),
        unknownWordsCount: Math.floor(Math.random() * 500),
        averagePerformance: Math.random() * 100,
        streak: Math.floor(Math.random() * 365),
        lastSessionDate: new Date().toISOString(),
        lessonTypes: {
          Reading: Math.floor(Math.random() * 50),
          Listening: Math.floor(Math.random() * 50),
          Speaking: Math.floor(Math.random() * 50),
        },
        errorTypes: {
          Grammar: Math.floor(Math.random() * 20),
          Vocabulary: Math.floor(Math.random() * 20),
        },
        feedbackRatings: Array.from({ length: 5 }, () => Math.floor(Math.random() * 5) + 1),
      });
    }, 1000);
  });
};

const Dashboard: React.FC = () => {
  const [userId, setUserId] = useState('123');
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { translate } = useTranslations();

  const fetchUserStats = useCallback(async () => {
    try {
      setLoading(true);
      // const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/statistics/${userId}`);
      const response = await fetchMockUserStats(userId);
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }
      // const data = await response.json();
      setUserStats(response);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const learnAction = useCallback(() => {
    navigate(screenApp.LEARNING_SCREEN);
  }, []);

  useEffect(() => {
    fetchUserStats();
  }, [fetchUserStats, userId]);

  if (loading) {
    return <LoadingScreen/>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {userStats ? (
        <>
          <Text style={styles.title}>{translate('Statistics')}</Text>
          <View>
            <Text style={styles.stat}>
              {`${translate('Session Count:')} ${userStats.sessionCount}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Total Time Spent:')} ${userStats.totalTimeSpent} ${translate('minutes')}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Known Words Count:')} ${userStats.knownWordsCount}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Unknown Words Count:')} ${userStats.unknownWordsCount}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Average Performance:')} ${userStats.averagePerformance.toFixed(2)}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Current Streak:')} ${userStats.streak} ${translate('days')}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Last Session Date:')} ${userStats.streak}`}
            </Text>
            <Text style={styles.stat}>
              {`${translate('Average Feedback Rating:')} ${userStats.sessionCount}`}
            </Text>
            {/* <Text style={styles.stat}>Last Session Date: {userStats.lastSessionDate.toDateString()}</Text>
              <Text style={styles.stat}>Average Feedback Rating: {userStats.getUserAverageFeedback(userId)?.toFixed(2)}</Text> */}
          </View><StandardButton text={translate('Learn!')} blackButton={false} onPressFunction={learnAction} />
        </>
      ) : <Text style={styles.error}>{translate('We have a problem. Please try later')}</Text>}
    </ScrollView>
  );
};

export default Dashboard;
