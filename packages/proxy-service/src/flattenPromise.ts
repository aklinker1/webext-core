import get from 'get-value';
import { DeepAsync } from './types';

/**
 * Given a promise of a variable, return a proxy to that awaits the promise internally so you don't
 * have to call `await` twice.
 *
 * You can unwrap promises of functions, objects, or classes.
 *
 * This is meant to be used to simplify service implementations, like so:
 *
 * @example
 * function createService(dependencyPromise: Promise<SomeDependency>) {
 *   const dependency = flattenPromise(dependencyPromise);
 *
 *   return {
 *     doSomething() {
 *       await dependency.someAsyncWork();
 *       // Instead of `await (await dependencyPromise).someAsyncWork();`
 *     }
 *   }
 * }
 */
export function flattenPromise<T>(promise: Promise<T>): DeepAsync<T> {
  function createProxy(location?: { propertyPath: string; parentPath?: string }): DeepAsync<T> {
    const wrapped = (() => {}) as DeepAsync<T>;
    const proxy = new Proxy(wrapped, {
      async apply(_target, _thisArg, args) {
        const t = (await promise) as any;
        const thisArg = (location?.parentPath ? get(t, location.parentPath) : t) as any | undefined;
        const fn = (location ? get(t, location.propertyPath) : t) as (...args: any[]) => any;
        return fn.apply(thisArg, args);
      },

      // Executed when accessing a property on an object
      get(target, propertyName, receiver) {
        if (propertyName === '__proxy' || typeof propertyName === 'symbol') {
          return Reflect.get(target, propertyName, receiver);
        }
        return createProxy({
          propertyPath:
            location == null ? propertyName : `${location.propertyPath}.${propertyName}`,
          parentPath: location?.propertyPath,
        });
      },
    });
    // @ts-expect-error: Adding a hidden property
    proxy.__proxy = true;
    return proxy;
  }

  return createProxy();
}
