import { local } from '.';

enum StorageKey {
  LANGUAGE_PICKER = 'languagePicker',
  HAS_SUCCESSFULLY_AUTHENTICATED = 'hasSuccesfullyAuthenticated',
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

export const getHasSuccesfullyAuthenticated = async (): Promise<boolean> => {
  return (await local.getItem(StorageKey.HAS_SUCCESSFULLY_AUTHENTICATED)) === 'true';
};

export const setHasSuccesfullyAuthenticated = async (): Promise<void> => {
  return local.setItem(StorageKey.HAS_SUCCESSFULLY_AUTHENTICATED, 'true');
};

export const removeHasSuccesfullyAuthenticated = async (): Promise<void> => {
  return local.removeItem(StorageKey.HAS_SUCCESSFULLY_AUTHENTICATED);
};

