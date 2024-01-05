import { local } from '.';

enum StorageKey {
  LANGUAGE_PICKER = 'languagePicker',
  GOAL_PICKER = 'GoalPicker',
  SPECIFIC_GOAL = 'SpecificGoal',
  USER_ID = 'UserID',
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

export const getGoalPickerSeenBefore = async (): Promise<boolean> => {
  return (await local.getItem(StorageKey.GOAL_PICKER)) === 'true';
};

export const setGoalPickerSeenBefore = async (): Promise<void> => {
  return local.setItem(StorageKey.GOAL_PICKER, 'true');
};

export const getGoal = async (): Promise<string> => {
  return (await local.getItem(StorageKey.SPECIFIC_GOAL));
};

export const setGoal = async (value: string): Promise<void> => {
  return local.setItem(StorageKey.SPECIFIC_GOAL, value);
};

export const removeGoal = async (): Promise<void> => {
  return local.removeItem(StorageKey.SPECIFIC_GOAL);
};

export const getUserID = async (): Promise<string> => {
  return (await local.getItem(StorageKey.USER_ID));
};

export const setUserID = async (value: string): Promise<void> => {
  return local.setItem(StorageKey.USER_ID, value);
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

