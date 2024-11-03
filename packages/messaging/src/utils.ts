/**
 * @description In firefox, when dispatching events externally from web-extension, it's necessary to clone all properties of the dictionary. ref: https://github.com/aklinker1/webext-core/pull/70#discussion_r1775031410
 */
export function prepareCustomEventDict<T>(
  data: T,
  options: { targetScope?: object } = { targetScope: window ?? undefined },
): T {
  // @ts-expect-error not exist cloneInto types because implemented only in Firefox.
  return typeof cloneInto !== 'undefined' ? cloneInto(data, options.targetScope) : data;
}
