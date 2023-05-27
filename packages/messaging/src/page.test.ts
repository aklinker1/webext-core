// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { defineWindowMessaging, defineCustomEventMessaging } from './page';
import { GenericMessenger } from './generic';
import { NamespaceMessagingConfig } from './types';

vi.mock('webextension-polyfill');

describe.each<
  [
    title: string,
    defineFn: <T extends Record<string, any>>(
      config: NamespaceMessagingConfig,
    ) => GenericMessenger<T, any, [string?: string]>,
    ...sendArg: any[],
  ]
>([
  ['Window Messenger', defineWindowMessaging, undefined],
  ['Custom Event Messenger', defineCustomEventMessaging, '*'],
])('%s', (_, _defineTestMessaging, ...sendArgs) => {
  // We need to call `removeAllListeners` between each test, so use `defineTestMessaging` instead
  // of `_defineTestMessaging`
  let messengers: GenericMessenger<any, any, []>[] = [];
  function defineTestMessaging<T extends Record<string, any>>(config?: NamespaceMessagingConfig) {
    const messenger = _defineTestMessaging<T>({ namespace: String(Math.random()), ...config });
    messengers.push(messenger);
    return messenger;
  }
  beforeEach(() => {
    messengers.forEach(m => m.removeAllListeners());
    messengers = [];
  });

  it('should send and return messages', async () => {
    interface MessageSchema {
      test(data: string): number;
    }
    const expected = 1 + Math.random();
    const data = 'data';
    const messenger1 = defineTestMessaging<MessageSchema>();
    const messenger2 = defineTestMessaging<MessageSchema>();
    const onMessage = vi.fn().mockResolvedValue(expected);

    messenger2.onMessage('test', onMessage);
    const actual = await messenger1.sendMessage('test', data, ...sendArgs);

    expect(actual).toEqual(expected);
    expect(onMessage).toBeCalledWith(
      expect.objectContaining({
        data,
        timestamp: expect.any(Number),
        id: expect.any(Number),
        type: 'test',
      }),
    );
  });

  it('should not send messages to a messenger with a different namespace', async () => {
    interface MessageSchema {
      test(data: string): number;
    }
    const messenger1 = defineTestMessaging<MessageSchema>({ namespace: 'b' });
    const messenger2 = defineTestMessaging<MessageSchema>({ namespace: 'a' });
    const messenger3 = defineTestMessaging<MessageSchema>({ namespace: 'a' });
    const expected = 2 + Math.random();
    const onMessage1 = vi.fn().mockReturnValue(2);
    const onMessage2 = vi.fn().mockReturnValue(expected);

    messenger1.onMessage('test', onMessage1);
    messenger2.onMessage('test', onMessage2);
    const actual = await messenger3.sendMessage('test', 'data', ...sendArgs);

    expect(onMessage1).not.toBeCalled();
    expect(onMessage2).toBeCalledTimes(1);
    expect(actual).toEqual(expected);
  });

  it('should return the first response', async () => {
    interface MessageSchema {
      test(data: string): number;
    }
    const expected = 3 + Math.random();
    const messenger1 = defineTestMessaging();
    const messenger2 = defineTestMessaging();
    const messenger3 = defineTestMessaging();
    const onMessageFast = vi.fn(async () => {
      await new Promise(res => setTimeout(res, 5));
      return expected;
    });
    const onMessageSlow = vi.fn(async () => {
      await new Promise(res => setTimeout(res, 10));
      return 3;
    });

    messenger1.onMessage('test', onMessageSlow);
    messenger2.onMessage('test', onMessageFast);
    const actual = await messenger3.sendMessage('test', 'data', ...sendArgs);

    expect(onMessageFast).toBeCalledTimes(1);
    expect(onMessageSlow).toBeCalledTimes(1);
    expect(actual).toBe(expected);
  });

  it('should throw an error if the responder throws an error', async () => {
    interface MessageSchema {
      test(data: string): number;
    }
    const error = new Error('test');
    const messenger1 = defineTestMessaging<MessageSchema>();
    const messenger2 = defineTestMessaging<MessageSchema>();
    const onMessage = vi.fn().mockRejectedValue(error);

    messenger2.onMessage('test', onMessage);

    await expect(() => messenger1.sendMessage('test', 'data', ...sendArgs)).rejects.toThrowError(
      error,
    );
  });
});
