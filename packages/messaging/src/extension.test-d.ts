import { describe, expectTypeOf, it } from 'vitest';
import { MaybePromise, ProtocolWithReturn } from './types';
import { defineExtensionMessaging, SendMessageOptions } from './extension';

describe('Messenger Typing', () => {
  it('should use any for data and return type when a protocol map is not passed', () => {
    const { sendMessage, onMessage } = defineExtensionMessaging();

    expectTypeOf(sendMessage).parameter(0).toBeString();
    expectTypeOf(sendMessage).parameter(1).toBeAny();
    expectTypeOf(sendMessage).returns.resolves.toBeAny();

    expectTypeOf(onMessage).parameter(1).parameter(0).toHaveProperty('data').toBeAny();
    expectTypeOf(onMessage).parameter(1).returns.toMatchTypeOf<void | MaybePromise<any>>();
  });

  it('should support basic values representing the data type and no return type', () => {
    const { sendMessage, onMessage } = defineExtensionMessaging<{
      someMessage: string;
    }>();

    expectTypeOf(sendMessage).parameter(0).toMatchTypeOf<'someMessage'>();
    expectTypeOf(sendMessage).parameter(1).toBeString();
    expectTypeOf(sendMessage).returns.resolves.toBeVoid();

    expectTypeOf(onMessage).parameter(1).parameter(0).toHaveProperty('data').toBeString();
    expectTypeOf(onMessage).parameter(1).returns.resolves.toBeVoid();
  });

  it('should support ProtocolWithReturn representing the data and the return type', () => {
    const { sendMessage, onMessage } = defineExtensionMessaging<{
      isOdd: ProtocolWithReturn<number, boolean>;
    }>();

    expectTypeOf(sendMessage).parameter(0).toMatchTypeOf<'isOdd'>();
    expectTypeOf(sendMessage).parameter(1).toBeNumber();
    expectTypeOf(sendMessage).returns.resolves.toBeBoolean();

    expectTypeOf(onMessage).parameter(1).parameter(0).toHaveProperty('data').toBeNumber();
    expectTypeOf(onMessage).parameter(1).returns.resolves.toBeBoolean();
  });

  it('should infer data and return types from a bound function declaration', () => {
    const { sendMessage, onMessage } = defineExtensionMessaging<{
      getStringLength(data: string): number;
    }>();

    expectTypeOf(sendMessage).parameter(0).toMatchTypeOf<'getStringLength'>();
    expectTypeOf(sendMessage).parameter(1).toBeString();
    expectTypeOf(sendMessage).returns.resolves.toBeNumber();

    expectTypeOf(onMessage).parameter(1).parameter(0).toHaveProperty('data').toBeString();
    expectTypeOf(onMessage).parameter(1).returns.resolves.toBeNumber();
  });

  it('should infer data and return types from an anonymous function declaration', () => {
    const { sendMessage, onMessage } = defineExtensionMessaging<{
      getStringLength: (data: string) => number;
    }>();

    // @ts-expect-error: Requires one parameter
    sendMessage('getStringLength');
    sendMessage('getStringLength', 'test');
    sendMessage('getStringLength', 'test', 123);

    expectTypeOf(sendMessage).parameter(0).toMatchTypeOf<'getStringLength'>();
    expectTypeOf(sendMessage).parameter(1).toBeString();
    expectTypeOf(sendMessage).returns.resolves.toBeNumber();

    expectTypeOf(onMessage).parameter(1).parameter(0).toHaveProperty('data').toBeString();
    expectTypeOf(onMessage).parameter(1).returns.resolves.toBeNumber();
  });

  it('should accept passing undefined to sendMessage when there is no data', () => {
    const { sendMessage } = defineExtensionMessaging<{
      ping: ProtocolWithReturn<undefined, 'pong'>;
    }>();

    sendMessage('ping');
    sendMessage('ping', undefined);
    // @ts-expect-error: It will still throw an error if you try to pass a target without sending `undefined` for the data.
    sendMessage('ping', 123);
    sendMessage('ping', undefined, 123);

    expectTypeOf(sendMessage).parameter(0).toMatchTypeOf<'ping'>();
    expectTypeOf(sendMessage).parameter(1).toBeUndefined();
    expectTypeOf(sendMessage).parameter(2).toEqualTypeOf<number | undefined | SendMessageOptions>();
  });

  it('should accept passing undefined to sendMessage when there is no arguments in a function definition', () => {
    const { sendMessage } = defineExtensionMessaging<{
      ping(): 'pong';
    }>();

    sendMessage('ping');
    sendMessage('ping', undefined);
    // @ts-expect-error: It will still throw an error if you try to pass a target without sending `undefined` for the data.
    sendMessage('ping', 123);
    sendMessage('ping', undefined, 123);

    expectTypeOf(sendMessage).parameter(0).toMatchTypeOf<'ping'>();
    expectTypeOf(sendMessage).parameter(1).toBeUndefined();
    expectTypeOf(sendMessage).parameter(2).toEqualTypeOf<number | undefined | SendMessageOptions>();
  });
});
