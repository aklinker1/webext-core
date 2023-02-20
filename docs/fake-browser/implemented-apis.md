# Implmeneted APIs

Not all `browser` APIs are implemented. Here's the up-to-date list of what has an implementation:

- `alarms`
- `runtime.id`
- `runtime.onInstalled`
- `runtime.onMessage`
- `runtime.onStartup`
- `runtime.onSuspend`
- `runtime.onSuspendCanceled`
- `runtime.onUpdateAvailable`
- `runtime.sendMessage`
- `storage`
- `tabs`
- `webNavigation`
- `windows`

:::warning
For all APIs not listed here, you will have to mock the functions behavior.

Or submit a PR to add support :smile:
:::

## Triggering Events

When possible, events are triggered based on other calls to other browser APIs. For example:

- Calling `fakeBrowser.runtime.sendMessage()` will trigger the `fakeBrowser.runtime.onMessage` listeners
- Calling `fakeBrowser.tabs.create()` will trigger the `fakeBroser.tabs.onCreated` listeners

Some events, like `runtime.onInstalled` or `alarms.onAlarm`, can't be triggered as they would be in a real extension.

> In the case of `onInstalled`, when is an extension "installed" during tests? Never? Or when the tests start? Either way, not useful for testing.

> In the case of `onAlarm`, alarms are meant to trigger in the far future, usually a much longer timespan than the duration of a unit test. Also, timers in tests are notoriously flakey and difficult to work with.

Instead, the `fakeBrowser` provides a `trigger` method on every implemented event that you can call to trigger them manually. Pass in the arguements that the listeners are called with:

```ts
await fakeBrowser.runtime.onInstalled.trigger({ reason: 'install' });
await fakeBrowser.alarms.onAlarm.trigger({
  name: 'alarm-name',
  periodInMinutes: 5,
  scheduledTime: Date.now(),
});
await fakeBrowser.tab.onCreated.trigger({ ... });
```

:::info
If you await the call to `trigger`, it will wait for all the listener to finish running.
:::

## Reseting

All of the implemented APIs store state of some kind in memory. When unit testing, we often want to reset all that state before each test so the tests are consistent. There are 3 ways to reset that in-memory state:

1. Reset everything: `fakeBrowser.reset()`
2. Reset just one API: `fakeBrowser.{api}.reset()`
3. Call `fakeBrowser.{api}.on{Event}.removeAllListeners()` to remove all the listeners setup for an event

::info
All the reset methods are synchronous
:::

For example, to clear the in-memory stored values for `browser.storage.local`, you could call any of the following:

- `fakeBrowser.reset()`
- `fakeBrowser.storage.reset()`
- `fakeBrowser.storage.local.reset()`

All these reset methods should show up with type-hints since this package is written in TS.

:::info
Generally, you should put a call to `fakeBrowser.reset()` in a `beforeEach` block to cleanup the state before every test.
:::

## `alarms`

- All alarms APIs are implemented as in production, except for `onAlarm`.
- You have to manually call `onAlarm.trigger()` for your event listeners to be executed.

## `runtime`

- All events have been implemented, but all of them other than `onMessage` must be triggered manually.
- `rutime.id` is a hardcoded string. You can set this to whatever you want, but it is reset to the hardcoded value when calling `reset()`.
- Unlike in a real production, `sendMessage` will trigger `onMessage` listeners setup in the same JS context. This allows you to add a listener when setting up your test, then call `sendMessage` to trigger it.

## `storage`

- The `local`, `sync`, and `managed` storages are all stored separately in memory.
- `storage.onChanged`, `storage.{area}.onChanged` events are all triggered when updating values.
- Each storage area can be reset individually.

## `tabs` and `windows`

- Fully implemented.
- All methods trigger corresponding `tabs` events AND `windows` events depending on what happened (ie: closing the last tab of a window would trigger both `tabs.onRemoved` and `windows.onRemoved`).

## `webNavigation`

- The two functions, `getFrame` and `getAllFrames` are not implemented. You will have to mock their return values yourself.
- All the event listeners are implemented, but none are triggered automatically. They can be triggered manually by calling `browser.webNavigation.{event}.trigger(...)`
