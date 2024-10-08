<!-- GENERATED FILE, DO NOT EDIT -->

# API Reference

::alert

See [`@webext-core/isolated-element`](/isolated-element/installation/)

::

## `createIsolatedElement`

```ts
async function createIsolatedElement(
  options: CreateIsolatedElementOptions,
): Promise<{
  parentElement: HTMLElement;
  isolatedElement: HTMLElement;
  shadow: ShadowRoot;
}> {
  // ...
}
```

Create an HTML element that has isolated styles from the rest of the page.

### Parameters

- ***`options: CreateIsolatedElementOptions`***

### Returns 

- A `parentElement` that can be added to the DOM
- The `shadow` root
- An `isolatedElement` that you should mount your UI to.

### Examples

```ts
const { isolatedElement, parentElement } = createIsolatedElement({
  name: 'example-ui',
  css: { textContent: "p { color: red }" },
  isolateEvents: true // or ['keydown', 'keyup', 'keypress']
});

// Create and mount your app inside the isolation
const ui = document.createElement("p");
ui.textContent = "Example UI";
isolatedElement.appendChild(ui);

// Add the UI to the DOM
document.body.appendChild(parentElement);
```

## `CreateIsolatedElementOptions`

```ts
interface CreateIsolatedElementOptions {
  name: string;
  mode?: "open" | "closed";
  css?: { url: string } | { textContent: string };
  isolateEvents?: boolean | string[];
}
```

Options that can be passed into `createIsolatedElement`.

### Properties 

- ***`name: string`***<br/>A unique HTML tag name (two words, kebab case - [see spec](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)) used when defining the web component used internally. Don't use the same name twice for different UIs.

- ***`mode?: 'open' | 'closed'`*** (default: `'closed'`)<br/>See [`ShadowRoot.mode`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode).

- ***`css?: { url: string } | { textContent: string }`***<br/>Either the URL to a CSS file or the text contents of a CSS file. The styles will be mounted inside the shadow DOM so they don't effect the rest of the page.

- ***`isolateEvents?: boolean | string[]`***<br/>When enabled, `event.stopPropagation` will be called on events trying to bubble out of the shadow root.

- Set to `true` to stop the propagation of a default set of events, `["keyup", "keydown", "keypress"]`
- Set to an array of event names to stop the propagation of a custom list of events

<br/><br/>

---

_API reference generated by [`docs/generate-api-references.ts`](https://github.com/aklinker1/webext-core/blob/main/docs/generate-api-references.ts)_