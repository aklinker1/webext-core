import { defineConfig } from 'vitepress';
import { defineTypescriptDocs } from './plugins/typescript-docs';

const ogDescription = 'Next Generation Frontend Tooling';
const ogTitle = 'Web Ext Core';
const ogUrl = 'https://webext-core.aklinker1.io';

const packageDirnames = [
  'storage',
  'messaging',
  'job-scheduler',
  'match-patterns',
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
  'job-scheduler': [
    {
      text: 'Get Started',
      link: '/guide/job-scheduler/',
    },
  ],
  'match-patterns': [
    {
      text: 'Get Started',
      link: '/guide/match-patterns/',
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
  ...defineTypescriptDocs(packageDirnames),

  title: `Web Ext Core`,
  description: 'Web Extension Development Made Easy',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    // ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    [
      'meta',
      {
        name: 'twitter:card',
        content:
          'https://repository-images.githubusercontent.com/562524328/c0cd6d4b-23ff-4536-97ab-f19a57cc23e3',
      },
    ],
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
        appId: '5YM53OJZKV',
        apiKey: 'afa7be8df70add29c036f21548117128',
        indexName: 'webext-core-aklinker1',
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
