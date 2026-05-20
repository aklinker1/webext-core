import { describe, it, expect } from 'bun:test';
import { InvalidMatchPattern, MatchPattern } from './index';

describe('MatchPattern', () => {
  it.each(['', '<all_url>', '*://*', '*', 'test://*/*'])(
    'should throw an error for invalid pattern "%s"',
    pattern => {
      expect(() => new MatchPattern(pattern)).toThrowError(InvalidMatchPattern);
    },
  );

  describe('includes', () => {
    describe('Examples from docs', () => {
      // TODO: Uncomment test cases when supported/fixed
      const examples = [
        // Chrome:
        // https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns#examples
        {
          patterns: ['https://*/*', 'https://*/'],
          matches: ['https://example.com', 'https://example.com'],
          nonMatches: [],
        },
        {
          patterns: ['https://*/foo*'],
          matches: ['https://example.com/foo/bar.html', 'https://www.google.com/foo'],
          nonMatches: [],
        },
        {
          patterns: ['https://*.google.com/foo*bar'],
          matches: ['https://www.google.com/foo/baz/bar', 'https://docs.google.com/foobar'],
          nonMatches: [],
        },
        // {
        //   patterns: ['file:///foo*'],
        //   matches: ['file:///foo/bar.html', 'file:///foo'],
        //   nonMatches: [],
        // },
        {
          patterns: [
            'http://127.0.0.1/*',
            // 'http://127.0.0.1/'
          ],
          matches: ['http://127.0.0.1/', 'http://127.0.0.1/foo/bar.html'],
          nonMatches: [],
        },
        {
          patterns: ['http://localhost/*'],
          matches: ['http://localhost:3000/test.html', 'http://localhost:3001'],
          nonMatches: [],
        },
        {
          patterns: ['*://mail.google.com/', '*://mail.google.com/*'],
          matches: ['http://mail.google.com', 'https://mail.google.com'],
          nonMatches: [],
        },
        // Firefox:
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns#examples
        {
          patterns: ['<all_urls>'],
          matches: [
            'http://example.org/',
            'https://a.org/some/path/',
            'ws://sockets.somewhere.org/',
            'wss://ws.example.com/stuff/',
            'ftp://files.somewhere.org/',
          ],
          nonMatches: [
            // 'resource://a/b/c/',
            // 'ftps://files.somewhere.org/'
          ],
        },
        {
          patterns: ['*://*/*'],
          matches: [
            'http://example.org/',
            'https://a.org/some/path/',
            // 'ws://sockets.somewhere.org/',
            // 'wss://ws.example.com/stuff/',
          ],
          nonMatches: ['tp://ftp.example.org/', 'file:///a/'],
        },
        {
          patterns: ['*://*.mozilla.org/*'],
          matches: [
            'http://mozilla.org/',
            'https://mozilla.org/',
            'http://a.mozilla.org/',
            'http://a.b.mozilla.org/',
            'https://b.mozilla.org/path/',
            // 'ws://ws.mozilla.org/',
            // 'wss://secure.mozilla.org/something',
          ],
          nonMatches: ['ftp://mozilla.org/', 'http://mozilla.com/', 'http://firefox.org/'],
        },
        {
          patterns: ['*://mozilla.org/'],
          matches: [
            'http://mozilla.org/',
            'https://mozilla.org/',
            // 'ws://mozilla.org/',
            // 'wss://mozilla.org/',
          ],
          nonMatches: ['ftp://mozilla.org/', 'http://a.mozilla.org/', 'http://mozilla.org/a'],
        },
        // {
        //   patterns: ['https://mozilla.org:8080/'],
        //   matches: ['https://mozilla.org:8080/'],
        //   nonMatches: ['http://a.mozilla.org/', 'http://mozilla.org:8081'],
        // },
        // {
        //   patterns: ['ftp://mozilla.org/'],
        //   matches: ['ftp://mozilla.org'],
        //   nonMatches: ['http://mozilla.org/', 'ftp://sub.mozilla.org/', 'ftp://mozilla.org/path'],
        // },
        {
          patterns: ['https://*/path'],
          matches: [
            'https://mozilla.org/path',
            'https://a.mozilla.org/path',
            'https://something.com/path',
          ],
          nonMatches: [
            'http://mozilla.org/path',
            'https://mozilla.org/path/',
            'https://mozilla.org/a',
            'https://mozilla.org/',
            // 'https://mozilla.org/path?foo=1',
          ],
        },
        {
          patterns: ['https://*/path/'],
          matches: [
            'https://mozilla.org/path/',
            'https://a.mozilla.org/path/',
            'https://something.com/path/',
          ],
          nonMatches: [
            'http://mozilla.org/path/',
            'https://mozilla.org/path',
            'https://mozilla.org/a',
            'https://mozilla.org/',
            // 'https://mozilla.org/path/?foo=1',
          ],
        },
        {
          patterns: ['https://mozilla.org/*'],
          matches: [
            'https://mozilla.org/',
            'https://mozilla.org/path',
            'https://mozilla.org/another',
            'https://mozilla.org/path/to/doc',
            'https://mozilla.org/path/to/doc?foo=1',
          ],
          nonMatches: ['http://mozilla.org/path', 'https://mozilla.com/path'],
        },
        {
          patterns: ['https://mozilla.org/a/b/c/'],
          matches: ['https://mozilla.org/a/b/c/', 'https://mozilla.org/a/b/c/#section1'],
          nonMatches: ['https://mozilla.org/a/b/c/d'],
        },
        // {
        //   patterns: ['file:///blah/*'],
        //   matches: ['file:///blah/', 'file:///blah/bleh'],
        //   nonMatches: ['file:///bleh/'],
        // },
        {
          patterns: ['https://mozilla.org/*/b/*/'],
          matches: [
            'https://mozilla.org/a/b/c/',
            'https://mozilla.org/d/b/f/',
            'https://mozilla.org/a/b/c/d/',
            'https://mozilla.org/a/b/c/d/#section1',
            'https://mozilla.org/a/b/c/d/?foo=/',
            // 'https://mozilla.org/a?foo=21314&bar=/b/&extra=c/ ',
          ],
          nonMatches: [
            'https://mozilla.org/b/*/',
            'https://mozilla.org/a/b/',
            // 'https://mozilla.org/a/b/c/d/?foo=bar',
          ],
        },
      ];
      for (const { patterns, matches, nonMatches } of examples) {
        for (const pattern of patterns) {
          for (const url of matches) {
            it(`should return true for ${pattern} and ${url}`, () => {
              const actual = new MatchPattern(pattern).includes(url);
              expect(actual).toBe(true);
            });
          }
          for (const url of nonMatches) {
            it(`should return false for ${pattern} and ${url}`, () => {
              const actual = new MatchPattern(pattern).includes(url);
              expect(actual).toBe(false);
            });
          }
        }
      }
    });

    describe('<all_urls>', () => {
      it.each([
        [true, 'http://google.com'],
        [true, new URL('https://youtube.com')],
        [true, new URL('file:///home/aklinker1')],
        [true, { hostname: 'test.com', pathname: '/', protocol: 'http:' } as Location],
      ])('should parse "%s", when "%s" is checked, return %s', (expected, url) => {
        expect(new MatchPattern('<all_urls>').includes(url)).toBe(expected);
      });
    });

    describe('* protocol', () => {
      it.each([
        ['*://google.com/search', 'http://google.com/search', true],
        ['*://google.com/search', 'https://google.com/search', true],
        ['*://google.com/search', 'file://google.com/search', false],
        ['*://google.com/search', 'ftp://google.com/search', false],
        ['*://google.com/search', 'urn://google.com/search', false],
      ])('should parse "%s", when "%s" is checked, return %s', (pattern, url, expected) => {
        expect(new MatchPattern(pattern).includes(url)).toBe(expected);
      });
    });

    describe.each(['http', 'https'])('%s protocol', protocol => {
      it.each([
        [`${protocol}://google.com/*`, `${protocol}://google.com/search1`, true],
        [`${protocol}://google.com/*`, `${protocol}://google.com/search2`, true],
        [`${protocol}://google.com/*`, `${protocol}://www.google.com/search`, false],
        [`${protocol}://*.google.com/search`, `${protocol}://google.com/search`, true],
        [`${protocol}://*.google.com/search`, `${protocol}://www.google.com/search`, true],
        [`${protocol}://*.google.com/search`, `${protocol}://images.google.com/search`, true],
      ])('should parse "%s", when "%s" is checked, return %s', (pattern, url, expected) => {
        expect(new MatchPattern(pattern).includes(url)).toBe(expected);
      });
    });
  });
});
