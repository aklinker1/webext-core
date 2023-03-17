import { defineExtensionMessaging } from '@webext-core/messaging';

// #region definition
interface ProtocolMap {
  someMessage(data: { arg1: string; arg2: number }): void;
}
// #endregion definition

const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();

// #region onMessage
onMessage('someMessage', message => {
  const { arg1, arg2 } = message.data;
});
// #endregion onMessage

// #region sendMessage
sendMessage('someMessage', { arg1: 'string', arg2: false });
// #endregion sendMessage
