export type AnySchema = Record<string, any>;

/**
 * Call this method to remove the listener that was added.
 */
export type RemoveListenerCallback = () => void;

export type OnChangeCallback<
  TSchema extends AnySchema,
  TKey extends keyof TSchema = keyof TSchema,
> = (newValue: TSchema[TKey], oldValue: TSchema[TKey] | null) => void;

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

  /**
   * Add a callback that is executed when a key is changed in the storage. Listeners are executed in
   * parallel, but the first listeners added are always started first.
   *
   * Returns a method that, when called, removes the listener that was added.
   */
  onChange<TKey extends keyof TSchema>(
    key: TKey,
    cb: OnChangeCallback<TSchema, TKey>,
  ): RemoveListenerCallback;
}
