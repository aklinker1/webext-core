---
title: Home
navigation: false
layout: page
main:
  fluid: false
---

:ellipsis{right=0px width=75% blur=150px}

## ::block-hero

cta:

- Get started
- /get-started/introduction
  secondary:
- Open on GitHub →
- https://github.com/aklinker1/webext-core

---

#title
Web extension development made easy

#description
Easy-to-use utilities for writing and testing web extensions that work on all browsers.

#support
::terminal

---

content:

- npm i @webext-core/storage
- npm i @webext-core/messaging
- npm i @webext-core/proxy-service
- npm i @webext-core/fake-browser
- npm i @webext-core/job-scheduler
- ...

---

::
::

::card-grid
#title
All Packages

#root
:ellipsis{left=0px width=40rem top=10rem blur=140px}

#default
::card{icon=noto:optical-disk}
#title
`@webext-core/storage`
#description
An alternative, type-safe API similar to local storage for accessing extension storage.
<br />
<br />
[Go to docs →](/storage/installation)
::

::card{icon=noto:left-speech-bubble}
#title
`@webext-core/messaging`
#description
A simpler, type-safe API for sending and recieving messages.
<br />
<br />
[Go to docs →](/messaging/installation)
::

::card{icon=noto:construction-worker}
#title
`@webext-core/job-scheduler`
#description
Easily schedule and manage reoccuring jobs.
<br />
<br />
[Go to docs →](/job-scheduler/installation)
::

::card{icon=noto:thumbs-up}
#title
`@webext-core/match-patterns`
#description
Utilities for working with match patterns.
<br />
<br />
[Go to docs →](/match-patterns/installation)
::

::card{icon=noto:oncoming-bus}
#title
`@webext-core/proxy-service`
#description
Call a function, but execute in a different JS context, like the background.
<br />
<br />
[Go to docs →](/proxy-service/installation)
::

::card{icon=noto:puzzle-piece}
#title
`@webext-core/isolated-element`
#description
Create a container who's styles are isolated from the page's styles.
<br />
<br />
[Go to docs →](/isolated-element/installation)
::

::card{icon=noto:rocket}
#title
`@webext-core/fake-browser`
#description
An in-memory implementation of webextension-polyfill for testing.
<br />
<br />
[Go to docs →](/fake-browser/installation)
::
::
