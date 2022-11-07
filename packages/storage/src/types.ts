export type AnySchema = Record<string, any>;

export interface ExtensionStorage<TSchema extends AnySchema> {
  /**
   * Clear all values from storage.
   */
  clear(): Promise<void>;

  /**
   * Return the value in storage or `null` if the item is missing.
   */
  getItem<TKey extends keyof TSchema>(key: TKey): Promise<Required<TSchema>[TKey] | null>;

  /**
   * Set the key and value in storage. Unlike with `localStorage`, passing `null` or `undefined`
   * will result in `null` being stored for the value.
   */
  setItem<TKey extends keyof TSchema>(key: TKey, value: TSchema[TKey]): Promise<void>;

  /**
   * Remove the value from storage at a key.
   */
  removeItem<TKey extends keyof TSchema>(key: TKey): Promise<void>;
}
