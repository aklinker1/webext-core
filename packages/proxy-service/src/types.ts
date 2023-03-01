import { ExtensionMessagingConfig } from '@webext-core/messaging';

export type Proimsify<T> = T extends Promise<any> ? T : Promise<T>;

export type AsyncFunction = (...args: any) => Promise<any>;

// Only support types 5 layers deep.
export type InputService =
  | AsyncFunction
  | Record<string, AsyncFunction>
  | Record<string, Record<string, AsyncFunction>>
  | Record<string, Record<string, Record<string, AsyncFunction>>>
  | Record<string, Record<string, Record<string, Record<string, AsyncFunction>>>>
  | Record<string, Record<string, Record<string, Record<string, Record<string, AsyncFunction>>>>>;

export interface ProxyServiceConfig extends ExtensionMessagingConfig {}
