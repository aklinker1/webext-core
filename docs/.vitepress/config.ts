import { defineConfig } from 'vitepress';
import { typescriptDocs } from './plugins/typescript-docs';

const ogDescription = 'Next Generation Frontend Tooling';
const ogTitle = 'Web Ext Core';
const ogUrl = 'https://webext-core.aklinker1.io';

const packageDirnames = [
  'storage',
  'messaging',
  'proxy-service',
  'isolated-element',
  'fake-browser',
];

const packagePages = {
  'fake-browser': [
    {
      text: 'Get Started',
      link: '/guide/fake-browser/',
    },
    {
      text: 'Testing Frameworks',
      link: '/guide/fake-browser/testing-frameworks',
    },
    {
      text: 'Reseting State',
      link: '/guide/fake-browser/reseting-state',
    },
    {
      text: 'Triggering Events',
      link: '/guide/fake-browser/triggering-events',
    },
    {
      text: 'Implemented APIs',
      link: '/guide/fake-browser/implemented-apis',
    },
  ],
  'isolated-element': [
    {
      text: 'Get Started',
      link: '/guide/isolated-element/',
    },
  ],
  messaging: [
    {
      text: 'Get Started',
      link: '/guide/messaging/',
    },
    {
      text: 'Protocol Maps',
      link: '/guide/messaging/protocol-maps',
    },
  ],
  'proxy-service': [
    {
      text: 'Get Started',
      link: '/guide/proxy-service/',
    },
    {
      text: 'Defining Services',
      link: '/guide/proxy-service/defining-services',
    },
  ],
  storage: [
    {
      text: 'Get Started',
      link: '/guide/storage/',
    },
    {
      text: 'Typescript',
      link: '/guide/storage/typescript',
    },
  ],
};

const packagesItemGroup = packageDirnames.map(dirname => ({
  text: dirname,
  link: `/guide/${dirname}/`,
  items: packagePages[dirname],
}));

const apiItemGroup = {
  text: 'API',
  items: packageDirnames.map(dirname => ({ text: dirname, link: `/api/${dirname}` })),
};

export default defineConfig({
  title: `Web Ext Core`,
  description: 'Web Extension Development Made Easy',

  ignoreDeadLinks: [/^\/api\/.*/],

  vite: {
    plugins: [typescriptDocs()],
  },

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

    search: {
      provider: 'algolia',
      options: {
        appId: 'W9IBYBNTPJ',
        apiKey: 'c8c2d0d5e6f058c31b8539fc58e259af',
        indexName: 'webext-core-docs',
      },
    },

    editLink: {
      pattern: 'https://github.com/aklinker1/webext-core/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/aklinker1/webext-core' }],

    footer: {
      message: `Released under the MIT License.`,
      copyright: 'Copyright © 2022-present Aaron Klinker & Web Ext Core Contributors',
    },

    nav: [{ text: 'Guide', link: '/guide/' }, apiItemGroup],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
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
        ...packagesItemGroup,
      ],
      '/api/': [apiItemGroup],
    },
  },
});
