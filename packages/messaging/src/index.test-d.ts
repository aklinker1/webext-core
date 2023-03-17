import { describe, expectTypeOf, it } from 'vitest';
import { defineExtensionMessaging, ProtocolWithReturn } from '.';

describe('Protocol Map Definitions', () => {
  it('should support basic values representing the data type and no return type', () => {
    interface ProtocolMap {
      message1: string;
    }
    const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();

    expectTypeOf(sendMessage).parameter(1).toBeString();
    expectTypeOf(sendMessage).returns.resolves.toBeVoid();

    expectTypeOf(onMessage).parameter(1).parameter(0).toHaveProperty('data').toBeString();
    expectTypeOf(onMessage).parameter(1).returns.resolves.toBeVoid();
  });

  it('should support ProtocolWithReturn representing the data and the return type', () => {
    interface ProtocolMap {
      message2: ProtocolWithReturn<number, boolean>;
    }
    const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();

    expectTypeOf(sendMessage).parameter(1).toBeNumber();
    expectTypeOf(sendMessage).returns.resolves.toBeBoolean();

    expectTypeOf(onMessage).parameter(1).parameter(0).toHaveProperty('data').toBeNumber();
    expectTypeOf(onMessage).parameter(1).returns.resolves.toBeBoolean();
  });
});
