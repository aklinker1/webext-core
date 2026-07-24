export function callbackOrUndefined<T>(value: unknown): ((t: T) => void) | undefined {
  return typeof value === 'function' ? (value as (t: T) => void) : undefined;
}

export function promiseOrCallback<T>(
  res: T,
  callback: ((t: Awaited<T>) => void) | undefined,
): Promise<Awaited<T>> {
  if (callback == null) return res instanceof Promise ? res : Promise.resolve(res);

  // @ts-expect-error: Intentionally return void here - this is the runtime
  // behavior, we only type this function as returning T to satisfy the types
  // where it's called from...
  return res instanceof Promise ? void res.then(callback) : callback(res);
}

export type EmptyCallback = () => void;
