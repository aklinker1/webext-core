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
    describe('<all_urls>', () => {
      it.each([
        [true, 'http://google.com'],
        [true, new URL('https://youtube.com')],
        [true, { hostname: 'test.com', pathname: '/', protocol: 'http:' } as Location],
      ])('should parse "%s", when "%s" is checked, return %s', (exepcted, url) => {
        expect(new MatchPattern('<all_urls>').includes(url)).toBe(exepcted);
      });
    });

    describe('* protocol', () => {
      it.each([
        ['*://google.com/search', 'http://google.com/search', true],
        ['*://google.com/search', 'https://google.com/search', true],
        ['*://google.com/search', 'file://google.com/search', false],
        ['*://google.com/search', 'ftp://google.com/search', false],
        ['*://google.com/search', 'urn://google.com/search', false],
      ])('should parse "%s", when "%s" is checked, return %s', (pattern, url, exepcted) => {
        expect(new MatchPattern(pattern).includes(url)).toBe(exepcted);
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
      ])('should parse "%s", when "%s" is checked, return %s', (pattern, url, exepcted) => {
        expect(new MatchPattern(pattern).includes(url)).toBe(exepcted);
      });
    });
  });
});
