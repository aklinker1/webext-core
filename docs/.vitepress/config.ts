import { defineConfig } from 'vitepress';

const ogDescription = 'Next Generation Frontend Tooling';
const ogTitle = 'Web Ext Core';
const ogUrl = 'https://webext-core.aklinker1.io';

const packages = {
  text: 'Packages',
  items: [
    { text: 'storage', link: '/storage/' },
    { text: 'messaging', link: '/messaging/' },
    { text: 'fake-browser', link: '/fake-browser/' },
    { text: 'proxy-service', link: '/proxy-service/' },
    { text: 'isolated-element', link: '/isolated-element/' },
  ].sort((l, r) => l.text.localeCompare(r.text)),
};

export default defineConfig({
  title: `Web Ext Core`,
  description: 'Web Extension Development Made Easy',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    // ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@vite_js' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'CBDFBSLI',
        'data-spa': 'auto',
        defer: '',
      },
    ],
  ],

  vue: {
    reactivityTransform: true,
  },

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      pattern: 'https://github.com/aklinker1/webext-core/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/aklinker1/webext-core' }],

    footer: {
      message: `Released under the MIT License.`,
      copyright: 'Copyright © 2022-present Aaron Klinker & Web Ext Core Contributors',
    },

    nav: [{ text: 'Guide', link: '/guide/' }, packages],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'Getting Started',
              link: '/guide/',
            },
            {
              text: 'Browser Support',
              link: '/guide/browser-support',
            },
          ],
        },
        packages,
      ],
      '/fake-browser/': [
        {
          text: 'fake-browser',
          items: [
            {
              text: 'Get Started',
              link: '/fake-browser/',
            },
          ],
        },
        packages,
      ],
      '/isolated-element/': [
        {
          text: 'isolated-element',
          items: [
            {
              text: 'Get Started',
              link: '/isolated-element/',
            },
          ],
        },
        packages,
      ],
      '/messaging/': [
        {
          text: 'messaging',
          items: [
            {
              text: 'Get Started',
              link: '/messaging/',
            },
            {
              text: 'API',
              link: '/messaging/api',
            },
          ],
        },
        packages,
      ],
      '/proxy-service/': [
        {
          text: 'proxy-service',
          items: [
            {
              text: 'Get Started',
              link: '/proxy-service/',
            },
          ],
        },
        packages,
      ],
      '/storage/': [
        {
          text: 'storage',
          items: [
            {
              text: 'Get Started',
              link: '/storage/',
            },
            {
              text: 'API',
              link: '/storage/api',
            },
            {
              text: 'Typescript',
              link: '/storage/typescript',
            },
          ],
        },
        packages,
      ],
    },
  },
});
