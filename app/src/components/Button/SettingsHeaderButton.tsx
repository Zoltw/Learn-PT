import React from 'react';
import { navigate } from '../../root/navigator';
import { Button } from 'react-native';
import useTranslations from '../../hooks/useTranslations';

export const SettingsHeaderButton: React.FC = () => {
  const { translate } = useTranslations();
  const title = translate('Settings');
  return (
    <Button
      onPress={() => navigate('Settings', { customBackButtonTitle: translate('Back') })}
      title={title}
    />
  );
};
