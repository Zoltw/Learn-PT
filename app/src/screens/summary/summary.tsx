import { useCallback } from 'react';
import useTranslations from '../../hooks/useTranslations';
import { StandardButton } from '../../components/Button/StandardButton';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { navigate } from '../../root/navigator';
import { screenApp } from '../screens';
import { RouteProp, useRoute } from '@react-navigation/native';

interface RouteParams {
  knownWords: Array<string>;
  unknownWords: Array<string>;
}

type SummaryRouteProp = RouteProp<{ Summary: RouteParams }, screenApp.SUMMARY>;

const Summary: React.FC = () => {
  const { translate } = useTranslations();
  const route = useRoute<SummaryRouteProp>();
  const { knownWords, unknownWords } = route.params;

  const Logout = useCallback(async () => {
    navigate(screenApp.DASHBOARD);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{`${knownWords}`}</Text>
      <Text>{`${unknownWords}`}</Text>
      <StandardButton text={translate('Back to dashboard')} blackButton={true} onPressFunction={Logout}/>
    </View>
  );
};


export default Summary;
