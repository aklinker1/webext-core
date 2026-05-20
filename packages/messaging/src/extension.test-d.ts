import { describe, expectTypeOf, it } from 'bun:test';

import { defineExtensionMessaging, SendMessageOptions } from './extension';
import { MaybePromise, ProtocolWithReturn } from './types';

describe('Messenger Typing', () => {
  it('should use any for data and return type when a protocol map is not passed', () => {
    const { sendMessage, onMessage } = defineExtensionMessaging();

    expectTypeOf(sendMessage).parameter(0).toBeString();
    expectTypeOf(sendMessage).parameter(1).toBeAny();
    expectTypeOf(sendMessage).returns.resolves.toBeAny();

    expectTypeOf(onMessage).parameter(1).parameter(0).toHaveProperty('data').toBeAny();
    expectTypeOf(onMessage).parameter(1).returns.toEqualTypeOf<void | MaybePromise<any>>();
  });

  it('should support basic values representing the data type and no return type', () => {
    const { sendMessage, onMessage } = defineExtensionMessaging<{
      someMessage: string;
    }>();

    const res = sendMessage('someMessage', 'test');
    expectTypeOf(res).resolves.toBeVoid();

    expectTypeOf(onMessage).parameter(1).parameter(0).toHaveProperty('data').toBeString();
    expectTypeOf(onMessage).parameter(1).returns.resolves.toBeVoid();
  });

  it('should support ProtocolWithReturn representing the data and the return type', () => {
    const { sendMessage, onMessage } = defineExtensionMessaging<{
      isOdd: ProtocolWithReturn<number, boolean>;
    }>();

    const res = sendMessage('isOdd', 1);
    expectTypeOf(res).resolves.toBeBoolean();

    expectTypeOf(onMessage).parameter(1).parameter(0).toHaveProperty('data').toBeNumber();
    expectTypeOf(onMessage).parameter(1).returns.resolves.toBeBoolean();
  });

  it('should infer data and return types from a bound function declaration', () => {
    const { sendMessage, onMessage } = defineExtensionMessaging<{
      getStringLength(data: string): number;
    }>();

    const res = sendMessage('getStringLength', 'test');
    expectTypeOf(res).resolves.toBeNumber();

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

    const res = sendMessage('getStringLength', 'test');
    expectTypeOf(res).resolves.toBeNumber();

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

    expectTypeOf(sendMessage).parameter(0).toExtend<'ping'>();
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

    expectTypeOf(sendMessage).parameter(0).toExtend<'ping'>();
    expectTypeOf(sendMessage).parameter(1).toBeUndefined();
    expectTypeOf(sendMessage).parameter(2).toEqualTypeOf<number | undefined | SendMessageOptions>();
  });
});
