/**
 * Interface used to log text to the console when sending and recieving messages.
 */
export interface Logger {
  debug(...args: any[]): void;
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

/**
 * Either a Promise of a type, or that type directly. Used to indicate that a method can by sync or
 * async.
 */
export type MaybePromise<T> = Promise<T> | T;

/**
 * Used to add a return type to a message in the protocol map.
 *
 * > Internally, this is just an object with random keys for the data and return types.
 *
 * @deprecated Use the function syntax instead: <https://webext-core.aklinker1.io/guide/messaging/protocol-maps.html#syntax>
 *
 * @example
 * interface ProtocolMap {
 *   // data is a string, returns undefined
 *   type1: string;
 *   // data is a string, returns a number
 *   type2: ProtocolWithReturn<string, number>;
 * }
 */
export interface ProtocolWithReturn<TData, TReturn> {
  /**
   * Stores the data type. Randomly named so that it isn't accidentally implemented.
   */
  BtVgCTPYZu: TData;
  /**
   * Stores the return type. Randomly named so that it isn't accidentally implemented.
   */
  RrhVseLgZW: TReturn;
}

/**
 * Given a function declaration, `ProtocolWithReturn`, or a value, return the message's data type.
 *
 * @deprecated Use the function syntax instead: <https://webext-core.aklinker1.io/guide/messaging/protocol-maps.html#syntax>
 */
export type GetDataType<T> = T extends (...args: infer Args) => any
  ? Args['length'] extends 0 | 1
    ? Args[0]
    : never
  : T extends ProtocolWithReturn<any, any>
  ? T['BtVgCTPYZu']
  : T;

/**
 * Given a function declaration, `ProtocolWithReturn`, or a value, return the message's return type.
 *
 * @deprecated Use the function syntax instead: <https://webext-core.aklinker1.io/guide/messaging/protocol-maps.html#syntax>
 */
export type GetReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : T extends ProtocolWithReturn<any, any>
  ? T['RrhVseLgZW']
  : void;

/**
 * Call to ensure an active listener has been removed.
 *
 * If the listener has already been removed with `Messenger.removeAllListeners`, this is a noop.
 */
export type RemoveListenerCallback = () => void;
