import { local } from '.';

enum StorageKey {
  LANGUAGE_PICKER = 'languagePicker',
  APP_LANGUAGE = 'appLanguage',
  HAS_SUCCESSFULLY_AUTHENTICATED = 'hasSuccessfullyAuthenticated',
}

export const getLanguagePickerSeenBefore = async (): Promise<boolean> => {
  return (await local.getItem(StorageKey.LANGUAGE_PICKER)) === 'true';
};

export const setLanguagePickerSeenBefore = async (): Promise<void> => {
  return local.setItem(StorageKey.LANGUAGE_PICKER, 'true');
};

export const removeLanguagePickerSeenBefore = async (): Promise<void> => {
  return local.removeItem(StorageKey.LANGUAGE_PICKER);
};

export const getHasSuccessfullyAuthenticated = async (): Promise<boolean> => {
  return (await local.getItem(StorageKey.HAS_SUCCESSFULLY_AUTHENTICATED)) === 'true';
};

export const setHasSuccessfullyAuthenticated = async (): Promise<void> => {
  return local.setItem(StorageKey.HAS_SUCCESSFULLY_AUTHENTICATED, 'true');
};

export const removeHasSuccessfullyAuthenticated = async (): Promise<void> => {
  return local.removeItem(StorageKey.HAS_SUCCESSFULLY_AUTHENTICATED);
};

export const getLanguage = async (): Promise<string> => {
  return (await local.getItem(StorageKey.APP_LANGUAGE));
};

export const setLanguage = async (value: string): Promise<void> => {
  return local.setItem(StorageKey.APP_LANGUAGE, value);
};

export const clearMemory = async (): Promise<void> => {
  return local.clear();
};

