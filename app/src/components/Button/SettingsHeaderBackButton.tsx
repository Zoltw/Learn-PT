import React from 'react';
import { navigate } from '../../../../root/navigator';
import { Button } from 'react-native';
import useTranslations from '../../hooks/useTranslations';
import { screenApp } from '../../screens/screens';

export const SettingsHeaderBackButton: React.FC = () => {
  const { translate } = useTranslations();
  const title = translate('Back');
  return (
    <Button
      onPress={() => navigate(screenApp.DASHBOARD)}
      title={title}
    />
  );
};
