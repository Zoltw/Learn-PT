import { Button, Text, View } from 'react-native';
import { styles } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../../../App';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthRegister'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};


const AuthRegister: React.FC<Props> = ({ navigation }) => {
  const isMounted = useRef(true);
  const { t } = useTranslation();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const navigateToLogin = useCallback(() => {
    if (isMounted.current) {
      navigation.navigate('AuthLogin');
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Reg</Text>
      <Button title={t('Register')} onPress={navigateToLogin}/>
    </View>
  );
};


export default AuthRegister;
