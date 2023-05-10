# Reseting State

Implemented APIs store state in memory. When unit testing, we often want to reset all that state before each test so each test has a blank state. There are 3 ways to reset that in-memory state:

1. Reset everything: `fakeBrowser.reset()`
2. Reset just one API: `fakeBrowser.{api}.resetState()`
3. Call `fakeBrowser.{api}.on{Event}.removeAllListeners()` to remove all the listeners setup for an event

:::info
All the reset methods are synchronous
:::

For example, to clear the in-memory stored values for `browser.storage.local`, you could call any of the following:

- `fakeBrowser.reset()`
- `fakeBrowser.storage.resetState()`

All these reset methods should show up in your editor's intelisense.

:::info
Generally, you should put a call to `fakeBrowser.reset()` in a `beforeEach` block to cleanup the state before every test.
:::
