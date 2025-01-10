import { describe, it, vi, beforeEach, expect } from 'vitest';
import { fakeBrowser } from '@webext-core/fake-browser';
import { ProtocolWithReturn } from './index';
import { defineExtensionMessaging } from './extension';

/**
 * This is defined in `@webext-core/fake-browser` when there are no `Browser.runtime.onMessage`
 * listeners active.
 */
const NO_RUNTIME_LISTENERS_ERROR = 'No listeners available';

vi.mock('webextension-polyfill');

interface ProtocolMap {
  getLength: ProtocolWithReturn<string, number>;
  getHalfLength: ProtocolWithReturn<string, number>;
}

describe('Messaging Wrapper', () => {
  beforeEach(() => {
    fakeBrowser.reset();
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it('should send and recieve messages', async () => {
    const { onMessage, sendMessage } = defineExtensionMessaging<ProtocolMap>();
    const input = 'test';
    const expected = 4;

    onMessage('getLength', ({ data }) => data.length);
    const actual = await sendMessage('getLength', input);

    expect(actual).toBe(expected);
  });

  it('should send messages to tabs with only tabId', async () => {
    const { sendMessage } = defineExtensionMessaging<ProtocolMap>();
    const input = 'test';
    const tabId = 0;
    const expected = 4;
    vi.spyOn(fakeBrowser.tabs, 'sendMessage').mockResolvedValueOnce({ res: expected });

    const actual = await sendMessage('getLength', input, tabId);

    expect(actual).toBe(expected);
    expect(fakeBrowser.tabs.sendMessage).toBeCalledTimes(1);
    expect(fakeBrowser.tabs.sendMessage).toBeCalledWith(
      tabId,
      {
        id: expect.any(Number),
        timestamp: expect.any(Number),
        type: 'getLength',
        data: input,
      },
      undefined,
    );
  });

  it('should send messages to tabs with tabId and frameId', async () => {
    const { sendMessage } = defineExtensionMessaging<ProtocolMap>();
    const input = 'test';
    const tabId = 0;
    const frameId = 0;
    const expected = 4;
    vi.spyOn(fakeBrowser.tabs, 'sendMessage').mockResolvedValueOnce({ res: expected });

    const actual = await sendMessage('getLength', input, { tabId, frameId });

    expect(actual).toBe(expected);
    expect(fakeBrowser.tabs.sendMessage).toBeCalledTimes(1);
    expect(fakeBrowser.tabs.sendMessage).toBeCalledWith(
      tabId,
      {
        id: expect.any(Number),
        timestamp: expect.any(Number),
        type: 'getLength',
        data: input,
      },
      { frameId },
    );
  });

  it('should handle errors', async () => {
    const { onMessage, sendMessage } = defineExtensionMessaging<ProtocolMap>();

    onMessage('getLength', () => {
      throw Error('Some error');
    });

    await expect(() => sendMessage('getLength', 'test')).rejects.toThrowError('Some error');
  });

  it('should throw an error when the message is not valid', async () => {
    const { onMessage } = defineExtensionMessaging<ProtocolMap>();

    onMessage('getLength', () => {
      throw Error('Some error');
    });
    const res = fakeBrowser.runtime.sendMessage('hello');

    await expect(res).rejects.toThrowError(
      "[messaging] Unknown message format, must include the 'type' & 'timestamp' fields, received: \"hello\"",
    );
  });

  it('should throw an error when no listeners have been setup', async () => {
    const { sendMessage } = defineExtensionMessaging<ProtocolMap>();

    await expect(sendMessage('getLength', 'test')).rejects.toThrowError(NO_RUNTIME_LISTENERS_ERROR);
  });

  it('should fully remove the root listener when all listeners are removed', async () => {
    const { onMessage, sendMessage } = defineExtensionMessaging<ProtocolMap>();
    const input = 'test';
    const expected = 4;

    const removeListener = onMessage('getLength', ({ data }) => data.length);
    const actual = await sendMessage('getLength', input);
    removeListener();

    expect(actual).toBe(expected);
    expect(sendMessage('getLength', input)).rejects.toThrowError(NO_RUNTIME_LISTENERS_ERROR);
  });

  it('should throw an error when a listener for a specific message type has not been added yet', async () => {
    const { onMessage, sendMessage } = defineExtensionMessaging<ProtocolMap>();

    onMessage('getHalfLength', ({ data }) => data.length / 2);

    expect(sendMessage('getLength', 'some-string')).rejects.toThrowError('No response');
  });

  it('should fully remove the root listener after removeAllListeners was called', async () => {
    const { onMessage, sendMessage, removeAllListeners } = defineExtensionMessaging<ProtocolMap>();
    const input = 'test';
    const expected = 4;

    onMessage('getLength', ({ data }) => data.length);
    const actual = await sendMessage('getLength', input);
    removeAllListeners();
    const res = sendMessage('getLength', input);

    expect(actual).toBe(expected);
    await expect(res).rejects.toThrowError(NO_RUNTIME_LISTENERS_ERROR);
  });

  it('should support multiple listeners at the same time, neither interacting with the other', async () => {
    const onMessage1 = vi.fn();
    const onMessage2 = vi.fn();

    const messenger1 = defineExtensionMessaging<{ message1(): void }>();
    const messenger2 = defineExtensionMessaging<{ message2(): void }>();
    messenger1.onMessage('message1', onMessage1);
    messenger2.onMessage('message2', onMessage2);

    await messenger1.sendMessage('message1', undefined);
    await messenger2.sendMessage('message2', undefined);

    expect(onMessage1).toBeCalledTimes(1);
    expect(onMessage2).toBeCalledTimes(1);
    expect(onMessage2.mock.invocationCallOrder[0]).toBeGreaterThan(
      onMessage1.mock.invocationCallOrder[0],
    );
  });
});
