import { local } from '.';

enum StorageKey {
  LANGUAGE_PICKER = 'languagePicker',
  LEVEL_GOAL_PICKER = 'LevelGoalPicker',
  LANGUAGE_GOAL_PICKER = 'LanguageGoalPicker',
  SPECIFIC_LEVEL_GOAL = 'SpecificLevelGoal',
  SPECIFIC_LANGUAGE_GOAL = 'SpecificLanguageGoal',
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

export const getLevelGoalPickerSeenBefore = async (): Promise<boolean> => {
  return (await local.getItem(StorageKey.LEVEL_GOAL_PICKER)) === 'true';
};

export const setLevelGoalPickerSeenBefore = async (): Promise<void> => {
  return local.setItem(StorageKey.LEVEL_GOAL_PICKER, 'true');
};

export const getLanguageGoalPickerSeenBefore = async (): Promise<boolean> => {
  return (await local.getItem(StorageKey.LANGUAGE_GOAL_PICKER)) === 'true';
};

export const setLanguageGoalPickerSeenBefore = async (): Promise<void> => {
  return local.setItem(StorageKey.LANGUAGE_GOAL_PICKER, 'true');
};

export const getLevelGoal = async (): Promise<string> => {
  return (await local.getItem(StorageKey.SPECIFIC_LEVEL_GOAL));
};

export const setLevelGoal = async (value: string): Promise<void> => {
  return local.setItem(StorageKey.SPECIFIC_LEVEL_GOAL, value);
};

export const removeLevelGoal = async (): Promise<void> => {
  return local.removeItem(StorageKey.SPECIFIC_LEVEL_GOAL);
};

export const getLanguageGoal = async (): Promise<string> => {
  return (await local.getItem(StorageKey.SPECIFIC_LANGUAGE_GOAL));
};

export const setLanguageGoal = async (value: string): Promise<void> => {
  return local.setItem(StorageKey.SPECIFIC_LANGUAGE_GOAL, value);
};

export const removeLanguageGoal = async (): Promise<void> => {
  return local.removeItem(StorageKey.SPECIFIC_LANGUAGE_GOAL);
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

