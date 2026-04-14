import { fakeBrowser } from '@webext-core/fake-browser';
import { beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import {
  createProxyService,
  isProxyService,
  type ProxyService,
  type ProxyServiceKey,
  registerService,
} from '.';

vi.mock('webextension-polyfill');

describe('Proxy Services', () => {
  beforeEach(fakeBrowser.reset);

  describe('RPC', () => {
    describe('Objects', () => {
      interface TestService {
        getVersion(): number;
        getNextVersion(): Promise<number>;
      }
      function createTestService(version: number): TestService {
        return {
          getVersion: () => version,
          getNextVersion: () => Promise.resolve(version + 1),
        };
      }

      it('should proxy function calls to the real service', async () => {
        const version = 4;
        const nextVersion = 5;

        const testService = createTestService(version);
        const key = 'test-service' as ProxyServiceKey<TestService>;

        registerService(key, testService);
        const proxy = createProxyService(key);

        await expect(proxy.getVersion()).resolves.toBe(version);
        await expect(proxy.getNextVersion()).resolves.toBe(nextVersion);
      });
    });

    describe('Classes', () => {
      class TestService {
        constructor(private readonly version: number) {}

        getVersion(): number {
          return this.version;
        }

        getNextVersion(): Promise<number> {
          return Promise.resolve(this.version + 1);
        }
      }

      it('should proxy function calls to the real service', async () => {
        const version = 4;
        const nextVersion = 5;

        const testService = new TestService(version);
        const key = 'test-service' as ProxyServiceKey<TestService>;

        registerService(key, testService);
        const proxy = createProxyService(key);

        await expect(proxy.getVersion()).resolves.toBe(version);
        await expect(proxy.getNextVersion()).resolves.toBe(nextVersion);
      });
    });

    describe('Function', () => {
      type SayHello = (name: string) => Promise<string>;
      const sayHello: SayHello = async name => `Hello, ${name}!`;

      it('should proxy function calls to the function', async () => {
        const name = 'Aaron';
        const expected = `Hello, ${name}!`;

        const key = 'say-hello' as ProxyServiceKey<SayHello>;

        registerService(key, sayHello);
        const proxy = createProxyService(key);

        await expect(proxy(name)).resolves.toBe(expected);
      });
    });

    describe('Deeply nested objects and classes', () => {
      interface Api {
        one: () => 1;
        two: {
          three: () => Promise<3>;
          four: {
            five: () => 5;
          };
        };
      }
      class Two {
        async three(): Promise<3> {
          return 3;
        }

        get four() {
          return {
            five: (): 5 => 5,
          };
        }
      }
      const api: Api = {
        one: () => 1,
        two: new Two(),
      };

      it('should be able to proxy function calls at any level', async () => {
        const key = 'api' as ProxyServiceKey<Api>;

        registerService(key, api);
        const proxy = createProxyService(key);

        await expect(proxy.one()).resolves.toBe(1);
        await expect(proxy.two.three()).resolves.toBe(3);
        await expect(proxy.two.four.five()).resolves.toBe(5);
      });
    });
  });

  describe('isProxyService', () => {
    it('should return true for proxies created by the library', () => {
      const proxy = createProxyService('test');
      expect(isProxyService(proxy)).toBe(true);
    });

    it('should return false for normal proxies', () => {
      const proxy = new Proxy({}, {});
      expect(isProxyService(proxy)).toBe(false);
    });

    it('should return false for non-proxies', () => {
      expect(isProxyService({})).toBe(false);
    });
  });

  describe('ProxyService', () => {
    it('should leave fully async services as-is', () => {
      type Service = {
        one: () => Promise<1>;
        two(): Promise<2>;
      };

      type Actual = ProxyService<Service>;

      expectTypeOf<Actual>().toEqualTypeOf<Service>();
    });

    it('should make non-async functions async', () => {
      type Service = {
        one: () => 1;
        two(): Promise<2>;
      };
      type Expected = {
        one: () => Promise<1>;
        two: () => Promise<2>;
      };

      type Actual = ProxyService<Service>;

      expectTypeOf<Actual>().toEqualTypeOf<Expected>();
    });

    it('should make non-function properties "never"', () => {
      type Service = {
        a: 'a';
        one: () => 1;
      };
      type Expected = {
        a: never;
        one: () => Promise<1>;
      };

      type Actual = ProxyService<Service>;

      expectTypeOf<Actual>().toEqualTypeOf<Expected>();
    });
  });
});
