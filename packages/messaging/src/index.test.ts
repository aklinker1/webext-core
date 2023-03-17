import { describe, it, vi, beforeEach, expect } from 'vitest';
import { fakeBrowser } from '@webext-core/fake-browser';
import { defineExtensionMessaging } from './index';

/**
 * This is defined in `@webext-core/fake-browser` when there are no `Browser.runtime.onMessage`
 * listeners active.
 */
const NO_RUNTIME_LISTENERS_ERROR = 'No listeners available';

vi.mock('webextension-polyfill');

interface ProtocolMap {
  getLength(string: string): number;
  getHalfLength(string: string): Promise<number>;
}

describe('Messaging Wrapper', () => {
  beforeEach(fakeBrowser.reset);

  it('should send and recieve messages', async () => {
    const { onMessage, sendMessage } = defineExtensionMessaging<ProtocolMap>();
    const input = 'test';
    const expected = 4;

    onMessage('getLength', ({ data }) => data.length);
    const actual = await sendMessage('getLength', input);

    expect(actual).toBe(expected);
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

  it('should throw an error when a listener for a specific message type has not been set yet', async () => {
    const { onMessage, sendMessage } = defineExtensionMessaging<ProtocolMap>();

    onMessage('getHalfLength', ({ data }) => data.length / 2);

    expect(sendMessage('getLength', 'some-string')).rejects.toThrowError(
      'Listener not found for message.type="getLength".\n\nDid you forget to call `onMessage("getLength", ...)`?',
    );
  });

  it('should fully remove the root listener after removeAllListeners was called', async () => {
    const {
      onMessage,
      sendMessage,
      removeAllMessageListeners: removeAllListeners,
    } = defineExtensionMessaging<ProtocolMap>();
    const input = 'test';
    const expected = 4;

    onMessage('getLength', ({ data }) => data.length);
    const actual = await sendMessage('getLength', input);
    removeAllListeners();
    const res = sendMessage('getLength', input);

    expect(actual).toBe(expected);
    await expect(res).rejects.toThrowError(NO_RUNTIME_LISTENERS_ERROR);
  });
});
