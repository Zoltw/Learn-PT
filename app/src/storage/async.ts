
export interface IAsyncStorage {
  length(): Promise<number | null>;
  getAllKeys(): Promise<ReadonlyArray<string>>;
  getItem(key: string): Promise<string | null>;
  setItem(key: string, data: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

export class AsyncStorage implements IAsyncStorage {
  storage: Storage;

  constructor(storage?: Storage) {
    this.storage = storage;
  }

  async length(): Promise<number | null> {
    return this.storage.length;
  }

  async getItem(key: string): Promise<string | null> {
    return this.storage.getItem(key);
  }

  async getAllKeys(): Promise<ReadonlyArray<string>> {
    const keys = new Array<string>();
    for (let i = 0, len = this.storage.length; i < len; i++) {
      keys.push(this.storage.key(i) as string);
    }
    return keys;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.storage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.storage.removeItem(key);
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }
}
