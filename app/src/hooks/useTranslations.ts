import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { TFunction } from 'i18next';

export interface UseTranslationsResult {
  translate: TFunction;
}

const useTranslations = (): UseTranslationsResult => {
  const { t } = useTranslation();
  const translate = useMemo(() => t, [t]);

  return { translate };
};

export default useTranslations;
