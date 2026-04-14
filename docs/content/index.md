---
seo:
  title: Web extension development made easy
  description: A collection of easy-to-use utilities for writing and testing web extensions that work on all browsers.
---

::u-page-hero
#title
Web extension development made easy

#description
A collection of easy-to-use utilities for writing and testing web extensions that work on all browsers.

#links
  :::u-button
  ---
  color: neutral
  size: xl
  to: /get-started/introduction
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  color: neutral
  icon: simple-icons-github
  size: xl
  to: https://github.com/aklinker1/webext-core
  variant: outline
  ---
  Star on GitHub
  :::
::

::u-page-section
#title
Packages

#features
  :::u-page-feature
  ---
  icon: i-noto-optical-disk
  ---
  #title
  `@webext-core/storage`

  #description
  An alternative, type-safe API similar to local storage for accessing extension storage.

  [Go to docs →](/storage/installation)
  :::

  :::u-page-feature
  ---
  icon: i-noto-left-speech-bubble
  ---
  #title
  `@webext-core/messaging`

  #description
  A simpler, type-safe API for sending and receiving messages.

  [Go to docs →](/messaging/installation)
  :::

  :::u-page-feature
  ---
  icon: i-noto-construction-worker
  ---
  #title
  `@webext-core/job-scheduler`

  #description
  Easily schedule and manage reoccurring jobs.

  [Go to docs →](/job-scheduler/installation)
  :::

  :::u-page-feature
  ---
  icon: i-noto-thumbs-up
  ---
  #title
  `@webext-core/match-patterns`

  #description
  Utilities for working with match patterns.

  [Go to docs →](/match-patterns/installation)
  :::

  :::u-page-feature
  ---
  icon: i-noto-oncoming-bus
  ---
  #title
  `@webext-core/proxy-service`

  #description
  Call a function, but execute in a different JS context, like the background.

  [Go to docs →](/proxy-service/installation)
  :::

  :::u-page-feature
  ---
  icon: i-noto-puzzle-piece
  ---
  #title
  `@webext-core/isolated-element`

  #description
  Create a container who's styles are isolated from the page's styles.

  [Go to docs →](/isolated-element/installation)
  :::

  :::u-page-feature
  ---
  icon: i-noto-rocket
  ---
  #title
  `@webext-core/fake-browser`

  #description
  An in-memory implementation of webextension-polyfill for testing.

  [Go to docs →](/fake-browser/installation)
  :::
::
