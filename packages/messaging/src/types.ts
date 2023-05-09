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
 * @example
 * interface ProtocolMap {
 *   // data is a string, returns undefined
 *   type1: string;
 *   // data is a string, returns a number
 *   type2: ProtocolWithReturn<string, number>;
 * }
 *
 * > Internally, this is just an object with random keys for the data and return types.
 */
export type ProtocolWithReturn<TData, TReturn> = { BtVgCTPYZu: TData; RrhVseLgZW: TReturn };

/**
 * Given a function declaration, `ProtocolWithReturn`, or a value, return the message's data type.
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
