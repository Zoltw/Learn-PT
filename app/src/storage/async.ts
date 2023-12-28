export interface IAsyncStorage {
  length(): Promise<number | null>;
  getAllKeys(): Promise<ReadonlyArray<string>>;
  getItem(key: string): Promise<string | null>;
  setItem(key: string, data: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}
