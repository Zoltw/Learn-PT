import { useCallback } from 'react';
import useTranslations from '../../hooks/useTranslations';
import { StandardButton } from '../../components/Button/StandardButton';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { screenApp } from '../screens';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getUserID } from '../../storage/storage';
import * as Updates from 'expo-updates';
interface RouteParams {
  knownWords: Array<string>;
  unknownWords: Array<string>;
}

type SummaryRouteProp = RouteProp<{ Summary: RouteParams }, screenApp.SUMMARY>;

const Summary: React.FC = () => {
  const { translate } = useTranslations();
  const route = useRoute<SummaryRouteProp>();
  const { knownWords, unknownWords } = route.params;

  const leaveSummarize = useCallback(async () => {
    try {
      const userId = await getUserID();
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/v1/users/words/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ knownWords, unknownWords }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Send level failed');
      }

      Updates.reloadAsync();
      return response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }, [knownWords, unknownWords]);

  return (
    <View style={styles.container}>
      {knownWords.length > 0 &&
      <View style={styles.box}>
        <Text style={styles.textHead}>{translate('You know these words:')}</Text>
        <Text style={styles.text}>{`${knownWords.join(', ')}`}</Text>
      </View>
      }
      {unknownWords.length > 0 &&
      <View style={styles.box}>
        <Text style={styles.textHead}>{translate('You dont know these words yet:')}</Text>
        <Text style={styles.text}>{`${unknownWords.join(', ')}`}</Text>
      </View>
      }

      <StandardButton text={translate('Back to dashboard')} blackButton={true} onPressFunction={leaveSummarize}/>
    </View>
  );
};


export default Summary;
