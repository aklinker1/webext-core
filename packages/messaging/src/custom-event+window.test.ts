// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { defineWindowMessaging } from './window';
import { defineCustomEventMessaging } from './custom-event';
import { GenericMessenger } from './generic';
import { NamespaceMessagingConfig } from './types';

vi.mock('webextension-polyfill');

describe.each<
  [
    title: string,
    defineFn: <T extends Record<string, any>>(
      config?: NamespaceMessagingConfig,
    ) => GenericMessenger<T, any, [string?: string]>,
    sendArg: string | undefined,
  ]
>([
  ['Window Messenger', defineWindowMessaging, undefined],
  ['Custom Event Messenger', defineCustomEventMessaging, '*'],
])('%s', (_, defineMessaging, sendArg) => {
  let messengers: GenericMessenger<any, any, []>[] = [];

  beforeEach(() => {
    messengers.forEach(m => m.removeAllListeners());
    messengers = [];
  });

  it('should send and return messages', async () => {
    interface MessageSchema {
      test(data: string): number;
    }
    const expected = Math.random();
    const data = 'data';
    const messenger1 = defineMessaging<MessageSchema>();
    const messenger2 = defineMessaging<MessageSchema>();
    messengers.push(messenger1, messenger2);
    const onMessage = vi.fn().mockResolvedValue(expected);

    messenger2.onMessage('test', onMessage);
    const actual = await messenger1.sendMessage('test', data, sendArg);

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
    const messenger1 = defineMessaging<MessageSchema>({ namespace: 'b' });
    const messenger2 = defineMessaging<MessageSchema>({ namespace: 'a' });
    const messenger3 = defineMessaging<MessageSchema>({ namespace: 'a' });
    messengers.push(messenger1, messenger2, messenger3);
    const expected = Math.random();
    const onMessage1 = vi.fn().mockReturnValue(1);
    const onMessage2 = vi.fn().mockReturnValue(expected);

    messenger1.onMessage('test', onMessage1);
    messenger2.onMessage('test', onMessage2);
    const actual = await messenger3.sendMessage('test', 'data', sendArg);

    expect(onMessage1).not.toBeCalled();
    expect(onMessage2).toBeCalledTimes(1);
    expect(actual).toEqual(expected);
  });

  it('should return the first response', async () => {
    interface MessageSchema {
      test(data: string): number;
    }
    const expected = 1;
    const messenger1 = defineMessaging();
    const messenger2 = defineMessaging();
    const messenger3 = defineMessaging();
    messengers.push(messenger1, messenger2, messenger3);
    const onMessage1 = vi.fn().mockResolvedValue(expected);
    const onMessage2 = vi.fn().mockResolvedValue(2);

    messenger1.onMessage('test', onMessage1);
    messenger2.onMessage('test', onMessage2);
    const actual = await messenger3.sendMessage('test', 'data', sendArg);

    expect(onMessage1).toBeCalledTimes(1);
    expect(onMessage2).toBeCalledTimes(1);
    expect(actual).toBe(expected);
  });

  it.todo('should send the correct data');

  it.todo('should throw an error if the responder throws an error');
});
