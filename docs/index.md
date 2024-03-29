---
layout: home

title: Web Ext Core
titleTemplate: Web Extensions Made Easy

hero:
  name: Web Ext Core
  tagline: Core libraries to develop web extensions for all browsers.
  image:
    src: /logo-with-shadow.png
    alt: Vite
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/aklinker1/webext-core

features:
  - icon: 📦
    title: '@webext-core/storage'
    link: /guide/storage/
    details: An alternative, type-safe API similar to local storage for accessing extension storage.
  - icon: 💬
    title: '@webext-core/messaging'
    link: /guide/messaging/
    details: A simpler, type-safe API for sending and recieving messages.
  - icon: 👷
    title: '@webext-core/job-scheduler'
    link: /guide/job-scheduler/
    details: Easily schedule and manage reoccuring jobs.
  - icon: 👍
    title: '@webext-core/match-patterns'
    link: /guide/match-patterns/
    details: Utilities for working with match patterns
  - icon: 🚍
    title: '@webext-core/proxy-service'
    link: /guide/proxy-service/
    details: Call a function, but execute in a different JS context, like the background.
  - icon: 🧩
    title: '@webext-core/isolated-element'
    link: /guide/isolated-element/
    details: Create a container who's styles are isolated from the page's styles.
  - icon: 🛠️
    title: '@webext-core/fake-browser'
    link: /guide/fake-browser/
    details: An in-memory implementation of webextension-polyfill for testing.
  - icon: 🚀
    title: 'COMING SOON: @webext-core/publish'
    details: Publish your extension to the various stores, with full support for Firefox source code uploads.
    link: https://github.com/aklinker1/publish-browser-extension
  - {}
---
