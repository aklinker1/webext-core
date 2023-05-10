# Implmeneted APIs

This file lists all the implemented APIs, their caveots, limitations, and example tests. Example tests are writen with vitest.

[[toc]]

:::info Not all APIs are implemented
For all APIs not listed here, you will have to mock the functions behavior yourself, or you can submit a PR to add support :smile:
:::

## `alarms`

- All alarms APIs are implemented as in production, except for `onAlarm`.
- You have to manually call `onAlarm.trigger()` for your event listeners to be executed.

## `notifications`

- `create`, `clear`, and `getAll` are fully implemented
- You have to manually trigger all the events (`onClosed`, `onClicked`, `onButtonClicked`, `onShown`)

### Example Tests

:::code-group

<<< @/snippets/ensureNotificationExists.test.ts

<<< @/snippets/setupNotificationShownReports.test.ts

:::

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
