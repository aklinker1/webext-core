---
layout: home

title: Web Ext Core
titleTemplate: Web Extensions Made Easy

hero:
  name: Web Ext Core
  tagline: Core libraries for developing web extensions on all browsers.
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
    link: /storage/
    details: An alternative, type-safe API similar to local storage for accessing extension storage.
  - icon: 💬
    title: '@webext-core/messaging'
    link: /messaging/
    details: A simpler, type-safe API for sending and recieving messages.
  - icon: 🚍
    title: '@webext-core/proxy-service'
    link: /proxy-service/
    details: Call a function, but execute in a different JS context, like the background.
  - icon: 🧩
    title: '@webext-core/isolated-element'
    link: /isolated-element/
    details: Create a container who's styles are isolated from the page's styles.
  - icon: 🛠️
    title: '@webext-core/fake-browser'
    link: /fake-browser/
    details: An in-memory implementation of webextension-polyfill for testing.
  - icon: 🚀
    title: 'COMING SOON: @webext-core/publish'
    details: Publish your extension to the various stores.
---
