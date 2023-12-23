import { StackNavigationProp } from '@react-navigation/stack';
import Auth from '../../components/Auth/Auth';
import { formTypes } from '../../components/Form/formTypes';
import { RootStackParamList } from '../../../../App';
import { useCallback } from 'react';
import { screenApp } from '../screens';
import { loginDisclaimer } from './variables';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, screenApp.AUTH_LOGIN>;
};

const AuthLogin: React.FC<Props> = ({ navigation }) => {
  const handleLoginNavigation = useCallback(() => {
    navigation.navigate(screenApp.LEARNING_SCREEN);
  }, [navigation]);

  return (
    <Auth
      type={formTypes.LOGIN}
      onNavigate={handleLoginNavigation}
      alternateNavigate={() => navigation.navigate(screenApp.AUTH_REGISTER)}
      alternateText={loginDisclaimer}
    />
  );
};

export default AuthLogin;
