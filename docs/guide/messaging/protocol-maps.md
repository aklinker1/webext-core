---
next:
  text: API Reference
  link: /api/messaging
---

# Protocol Maps

> Only relevant to TypeScript projects.

## Overview

Protocol maps define types for `sendMessage` and `onMessage` in a single place. You'll never need to write type parameters; the data and return types will be inferred automatically!

## Syntax

Protocol maps are simple interfaces passed into `defineExtensionMessaging`. They specify a list of valid message types, as well as each message's data type and return type.

<!-- prettier-ignore -->
```ts
interface ProtocolMap {
  message1(): void;                // No data and no return type
  message2(data: string): void;    // Only data
  message3(): boolean;             // Only a return type
  message4(data: string): boolean; // Data and return type
}

export const { sendMessage, onMessage } = defineExtensionMessaging<ProtocolMap>();
```

When calling `sendMessage` or `onMessage`, all the types will be inferred:

```ts
onMessage('message2', ({ data /* string */ }) /* : void */ => {});
onMessage('message3', (message) /* : boolean */ => true);

const res /* : boolean */ = await sendMessage('message3', undefined);
const res /* : boolean */ = await sendMessage('message4', 'text');
```

## Async Messages

All messages are async. In your protocol map, you don't need to make the return type `Promise<T>`, `T` will work just fine.

```ts
interface ProtocolMap {
  someMessage(): string; // [!code ++]
  someMessage(): Promise<string>; // [!code --]
}
```

## Multiple Arguments

Protocol map functions should be defined with a single parameter, `data`. To pass more than one argument, make the `data` parameter an object instead!

```ts
interface ProtocolMap {
  someMessage(data: { arg1: string; arg2: boolean }): void; // [!code ++]
  someMessage(arg1: string, arg2: boolean): void; // [!code --]
}
```

```ts
await sendMessage('someMessage', { arg1: ..., arg2: ... });
```
