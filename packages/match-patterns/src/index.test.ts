// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { InvalidMatchPattern, MatchPattern } from './index';

describe('MatchPattern', () => {
  it.each(['', '<all_url>', '*://*', '*', 'test://*/*'])(
    'should throw an error for invalid pattern "%s"',
    pattern => {
      expect(() => new MatchPattern(pattern)).toThrowError(InvalidMatchPattern);
    },
  );

  describe('includes', () => {
    describe('Chrome doc examples', () => {
      // https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns#examples
      const examples = [
        {
          patterns: ['https://*/*', 'https://*/'],
          matches: ['https://example.com', 'https://example.com'],
        },
        {
          patterns: ['https://*/foo*'],
          matches: ['https://example.com/foo/bar.html', 'https://www.google.com/foo'],
        },
        {
          patterns: ['https://*.google.com/foo*bar'],
          matches: ['https://www.google.com/foo/baz/bar', 'https://docs.google.com/foobar'],
        },
        // TODO: Uncomment when file: support is added
        {
          patterns: ['file:///foo*'],
          matches: ['file:///foo/bar.html', 'file:///foo'],
        },
        {
          patterns: ['http://127.0.0.1/*', 'http://127.0.0.1/'],
          matches: ['http://127.0.0.1/', 'http://127.0.0.1/foo/bar.html'],
        },
        {
          patterns: ['http://localhost/*'],
          matches: ['http://localhost:3000/test.html', 'http://localhost:3001'],
        },
        {
          patterns: ['*://mail.google.com/', '*://mail.google.com/*'],
          matches: ['http://mail.google.com', 'https://mail.google.com'],
        },
      ];
      for (const { patterns, matches } of examples) {
        for (const pattern of patterns) {
          for (const match of matches) {
            it(`should return true for ${pattern} and ${match}`, () => {
              const actual = new MatchPattern(pattern).includes(match);
              expect(actual).toBe(true);
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
