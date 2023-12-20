import { Button, Text, View } from 'react-native';
import { styles } from './styles';
import { useCallback, useEffect, useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { useTranslations } from '../../../../localization/useTranslations';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthLogin'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const AuthLogin: React.FC<Props> = ({ navigation }) => {
  const isMounted = useRef(true);
  const { translate } = useTranslations();

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

      </View>
      <Button title={translate('Register')} onPress={navigateToRegister}/>
    </View>
  );
};


export default AuthLogin;
