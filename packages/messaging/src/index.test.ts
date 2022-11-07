import { describe, it, vi, beforeEach, expect } from 'vitest';
import { fakeBrowser } from '@webext-core/fake-browser';
import { ProtocolWithReturn, defineExtensionMessaging } from './index';

vi.mock('webextension-polyfill');

interface ProtocolMap {
  getLength: ProtocolWithReturn<string, number>;
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

    await expect(() => fakeBrowser.runtime.sendMessage('hello')).rejects.toThrowError(
      "[messaging] Unknown message format, must include the 'key' & 'timestamp' fields, received: \"hello\"",
    );
  });

  it('should throw an error when no listeners are available', async () => {
    const { sendMessage } = defineExtensionMessaging<ProtocolMap>();

    await expect(() => sendMessage('getLength', 'test')).rejects.toThrowError(
      'No listeners available',
    );
  });
});
