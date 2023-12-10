import { Button, Text, View } from 'react-native';
import { styles } from './styles';
import { TypingField } from '../../components/TypingField/TypingField';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthLogin'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const AuthLogin: React.FC<Props> = ({ navigation }) => {
  const isMounted = useRef(true);
  const { t } = useTranslation();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const navigateToRegister = useCallback(() => {
    if (isMounted.current) {
      navigation.navigate('AuthRegister');
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Open dup dup dup on your app!</Text>
      <View style={styles.container2}>
        <TypingField blankText={t('Type your email')}/>
        <TypingField blankText={t('Password')}/>
        <TypingField blankText={t('Repeat Password')}/>
      </View>
      <Button title={t('Register')} onPress={navigateToRegister}/>
    </View>
  );
};


export default AuthLogin;
