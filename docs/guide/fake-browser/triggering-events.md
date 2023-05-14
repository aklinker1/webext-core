# Triggering Events

When possible, events are triggered based on other calls to other browser APIs. For example:

- Calling `fakeBrowser.runtime.sendMessage()` will trigger the `fakeBrowser.runtime.onMessage` listeners
- Calling `fakeBrowser.tabs.create()` will trigger the `fakeBrowser.tabs.onCreated` listeners

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
