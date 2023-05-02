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
    // <script async defer data-website-id="04aff3ed-57d7-4ee0-9faf-e24a39adeafa" src="https://stats.aklinker1.io/umami.js"></script>
    [
      'script',
      {
        async: '',
        defer: '',
        'data-website-id': '04aff3ed-57d7-4ee0-9faf-e24a39adeafa',
        src: 'https://stats.aklinker1.io/umami.js',
      },
    ],
  ],

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
            {
              text: 'Contributing',
              link: '/guide/contributing',
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
            {
              text: 'Testing Frameworks',
              link: '/fake-browser/testing-frameworks',
            },
            {
              text: 'Reseting State',
              link: '/fake-browser/reseting-state',
            },
            {
              text: 'Triggering Events',
              link: '/fake-browser/triggering-events',
            },
            {
              text: 'Implemented APIs',
              link: '/fake-browser/implemented-apis',
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
              text: 'Protocol Maps',
              link: '/messaging/protocol-maps',
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
            {
              text: 'Variants',
              link: '/proxy-service/variants',
            },
            {
              text: 'API',
              link: '/proxy-service/api',
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
