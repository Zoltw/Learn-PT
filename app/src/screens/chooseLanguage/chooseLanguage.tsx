import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LanguagePicker } from '../../components/LanguagePicker/LanguagePicker';
import { RootStackParamList } from '../../../../App';
import { StandardButton } from '../../components/Button/StandardButton';
import { styles } from './styles';


type WelcomeNavigationProp = StackNavigationProp<RootStackParamList, 'ChooseLanguage'>;

type Props = {
  navigation: WelcomeNavigationProp;
};

const ChooseLanguage: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Choose your language</Text>
      <LanguagePicker />
      <StandardButton
        text={'Continue'}
        onPressFunction={() => navigation.replace('Welcome')} blackButton={false} />
    </View>
  );
};

export default ChooseLanguage;
