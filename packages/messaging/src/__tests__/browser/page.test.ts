import { describe, it, expect, vi, beforeEach } from 'vitest';
import { defineWindowMessaging, defineCustomEventMessaging } from '../../page';
import { GenericMessenger } from '../../generic';
import { NamespaceMessagingConfig } from '../../types';

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
    const messenger = _defineTestMessaging<T>({ namespace: 'default-namespace', ...config });
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

  it('should throw an error if the responder responds with non-serializable data', async () => {
    interface MessageSchema {
      test(data: string): { getName: () => string };
    }
    const messenger1 = defineTestMessaging<MessageSchema>();
    const messenger2 = defineTestMessaging<MessageSchema>();
    const invalidFn = () => 'testUser1';
    const onMessage = vi.fn().mockReturnValue({ getName: invalidFn });

    messenger2.onMessage('test', onMessage);

    await expect(messenger1.sendMessage('test', 'data', ...sendArgs)).rejects.toThrowError(
      `Failed to execute 'structuredClone' on 'Window': ${invalidFn.toString()} could not be cloned.`,
    );
  });

  it('should throw an error if the sender sends non-serializable data', async () => {
    interface MessageSchema {
      test(data: { getName: () => string }): boolean;
    }
    const messenger1 = defineTestMessaging<MessageSchema>();
    const messenger2 = defineTestMessaging<MessageSchema>();
    const invalidFn = () => 'testUser1';

    messenger2.onMessage('test', () => true);

    await expect(
      messenger1.sendMessage('test', { getName: invalidFn }, ...sendArgs),
    ).rejects.toThrowError(
      `Failed to execute 'structuredClone' on 'Window': ${invalidFn.toString()} could not be cloned.`,
    );
  });

  it('should be messaging for the same message type between different instances', async () => {
    interface MessageSchema {
      test(data: string): string;
    }
    const messengerA1 = defineTestMessaging<MessageSchema>({ namespace: 'a' });
    const messengerA2 = defineTestMessaging<MessageSchema>({ namespace: 'a' });
    const messengerB1 = defineTestMessaging<MessageSchema>({ namespace: 'b' });
    const messengerB2 = defineTestMessaging<MessageSchema>({ namespace: 'b' });

    messengerA1.onMessage('test', message => {
      expect(message.data).toBe('ping-from-A2');
      return 'pong-from-A1';
    });
    messengerA2.onMessage('test', message => {
      expect(message.data).toBe('ping-from-A1');
      return 'pong-from-A2';
    });
    messengerB1.onMessage('test', message => {
      expect(message.data).toBe('ping-from-B2');
      return 'pong-from-B1';
    });
    messengerB2.onMessage('test', message => {
      expect(message.data).toBe('ping-from-B1');
      return 'pong-from-B2';
    });

    const resA1 = messengerA1.sendMessage('test', 'ping-from-A1');
    const resA2 = messengerA2.sendMessage('test', 'ping-from-A2');
    const resB1 = messengerB1.sendMessage('test', 'ping-from-B1');
    const resB2 = messengerB2.sendMessage('test', 'ping-from-B2');

    expect(resA1).resolves.toBe('pong-from-A2');
    expect(resA2).resolves.toBe('pong-from-A1');
    expect(resB1).resolves.toBe('pong-from-B2');
    expect(resB2).resolves.toBe('pong-from-B1');
  });
});
