import { StackNavigationProp } from '@react-navigation/stack';
import Auth from '../../components/Auth/Auth';
import { formTypes } from '../../components/Form/formTypes';
import { RootStackParamList } from '../../../../App';
import { useCallback } from 'react';
import { registerDisclaimer } from './variables';
import { screenApp } from '../screens';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, screenApp.AUTH_REGISTER>;
};

const AuthRegister: React.FC<Props> = ({ navigation }) => {
  const handleRegisterNavigation = useCallback(() => {
    navigation.navigate(screenApp.AUTH_LOGIN);
  }, [navigation]);

  return (
    <Auth
      type={formTypes.REGISTER}
      onNavigate={handleRegisterNavigation}
      alternateNavigate={() => navigation.navigate(screenApp.AUTH_LOGIN)}
      alternateText={registerDisclaimer}
    />
  );
};

export default AuthRegister;
