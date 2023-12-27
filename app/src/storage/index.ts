import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { IAsyncStorage } from './async';

export const local: IAsyncStorage = {
  async length() {
    return (await ReactNativeAsyncStorage.getAllKeys()).length;
  },

  async getAllKeys(): Promise<ReadonlyArray<string>> {
    return ReactNativeAsyncStorage.getAllKeys();
  },

  async getItem(key: string): Promise<string | null> {
    return ReactNativeAsyncStorage.getItem(key);
  },

  async setItem(key: string, value: string) {
    return ReactNativeAsyncStorage.setItem(key, value);
  },

  async removeItem(key: string) {
    return ReactNativeAsyncStorage.removeItem(key);
  },

  async clear() {
    return ReactNativeAsyncStorage.clear();
  },
};
