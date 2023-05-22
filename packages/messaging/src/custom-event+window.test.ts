// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { defineWindowMessaging } from './window';
import { defineCustomEventMessaging } from './custom-event';

vi.mock('webextension-polyfill');

describe.each([
  ['Window Messenger', defineWindowMessaging, undefined],
  ['Custom Event Messenger', defineCustomEventMessaging, '*'],
])('%s', (_, defineMessaging, sendArg) => {
  it('should send and return messages', async () => {
    interface MessageSchema {
      test(data: string): number;
    }
    const expected = 4;
    const data = 'data';
    const messenger1 = defineMessaging<MessageSchema>();
    const messenger2 = defineMessaging<MessageSchema>();
    const onMessage = vi.fn().mockResolvedValue(expected);

    messenger2.onMessage('test', onMessage);
    const actual = await messenger1.sendMessage(
      'test',
      data,
      // @ts-expect-error: different sendMessage args for the messengers
      sendArg,
    );

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

  it('should not send messages to itself', async () => {
    interface MessageSchema {
      test(data: string): number;
    }
    const messenger = defineMessaging<MessageSchema>();
    const onMessage = vi.fn();

    messenger.onMessage('test', onMessage);
    await messenger.sendMessage(
      'test',
      'data',
      // @ts-expect-error: different sendMessage args for the messengers
      sendArg,
    );

    expect(onMessage).not.toBeCalled();
  });

  it('should not send messages to a messenger with a different namespace', async () => {
    interface MessageSchema {
      test(data: string): number;
    }
    const messenger1 = defineMessaging<MessageSchema>();
    const messenger2 = defineMessaging<MessageSchema>({ namespace: 'b' });
    const onMessage = vi.fn();

    messenger2.onMessage('test', onMessage);
    await messenger1.sendMessage(
      'test',
      'data',
      // @ts-expect-error: different sendMessage args for the messengers
      sendArg,
    );

    expect(onMessage).not.toBeCalled();
  });

  it('should return the first response', async () => {
    interface MessageSchema {
      test(data: string): number;
    }
    const expected = 1;
    const messenger1 = defineMessaging();
    const messenger2 = defineMessaging();
    const messenger3 = defineMessaging();
    const onMessage1 = vi.fn().mockResolvedValue(expected);
    const onMessage2 = vi.fn().mockResolvedValue(2);

    messenger1.onMessage('test', onMessage1);
    messenger2.onMessage('test', onMessage2);
    const actual = await messenger3.sendMessage(
      'test',
      'data',
      // @ts-expect-error: different sendMessage args for the messengers
      sendArg,
    );

    expect(onMessage1).toBeCalledTimes(1);
    expect(onMessage2).toBeCalledTimes(1);
    expect(actual).toBe(expected);
  });

  it.todo('should send the correct data');

  it.todo('should throw an error if the responder throws an error');
});
