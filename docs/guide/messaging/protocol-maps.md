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

All messages are async. In your protocol map, don't specify return types as `Promise<T>`, just use `T`.

```ts
interface ProtocolMap {
  // Do this:
  someMessage(): string;

  // Not this:
  someMessage(): Promise<string>;
}
```

## Multiple Arguments

Protocol maps only support a single argument. To pass more than one argument, pass an object instead!

```ts
interface ProtocolMap {
  someMessage(data: { arg1: string; arg2: boolean }): void;

  // THIS DOES NOT WORK - the data type will be inferred as the first argument's type.
  someMessage(arg1: string, arg2: boolean): void;
}
```

```ts
await sendMessage('someMessage', { arg1: '...', arg2: true });
```

## `ProtocolWithReturn`

Instead of using function declarations, you can use the following to achieve the same types:

<!-- prettier-ignore -->
```ts
interface ProtocolMap {
  message1: undefined;                              // No data and no return type
  message2: string;                                 // Only data
  message3: ProtocolWithReturn<undefined, boolean>; // Only a return type
  message4: ProtocolWithReturn<string, boolean>;    // Data and return type
}
```

> The functional syntax is easier to read and more intuative, and was added in `v1.3.0` to replace this syntax.
