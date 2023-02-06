import { defineConfig } from 'vitepress';
import { generate } from 'ts-to-md';
import fs from 'node:fs';

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

function generatePackageDocs(name: string) {
  console.log(`Generating API docs for ${name}...`);
  const markdown = generate({
    inputFile: `packages/${name}/lib/index.d.ts`,
    prettier: { semi: false, printWidth: 80 },
  });
  fs.writeFileSync(`docs/${name}/api.gen.md`, markdown, 'utf-8');
}

// After a change to one of the packages, it needs to be rebuilt before API changes will show up.
generatePackageDocs('storage');
generatePackageDocs('proxy-service');
generatePackageDocs('isolated-element');
generatePackageDocs('messaging');
generatePackageDocs('fake-browser');

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
            {
              text: 'API',
              link: '/isolated-element/api',
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
