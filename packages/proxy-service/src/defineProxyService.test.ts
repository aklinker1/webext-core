import { defineProxyService } from './defineProxyService';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { isBackground } from './isBackground';
import { fakeBrowser } from '@webext-core/fake-browser';

vi.mock('webextension-polyfill');

vi.mock('./isBackground', () => ({
  isBackground: vi.fn(),
}));
const isBackgroundMock = vi.mocked(isBackground);

const defineTestService = () =>
  defineProxyService('TestService', (version: number) => ({
    getVersion: () => version,
    getNextVersion: () => Promise.resolve(version + 1),
  }));

describe('defineProxyService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    fakeBrowser.reset();
  });

  it("getService should fail to get the service in the background if one hasn't been registered", () => {
    const [_, getTestService] = defineTestService();
    isBackgroundMock.mockReturnValue(true);

    expect(getTestService).toThrowError();
  });

  it('getService should return a proxy in other contexts', () => {
    const [registerTestService, getTestService] = defineTestService();
    registerTestService(1);
    isBackgroundMock.mockReturnValue(false);

    // @ts-expect-error: __proxy is not apart of the type, but it's there
    expect(getTestService().__proxy).toEqual(true);
  });

  it('should defer execution of the proxy service methods to the real service methods', async () => {
    const version = 10;
    const [registerTestService, getTestService] = defineTestService();
    registerTestService(version);

    isBackgroundMock.mockReturnValue(true);
    const real = getTestService();
    isBackgroundMock.mockReturnValue(false);
    const proxy = getTestService();
    const realGetVersionSpy = vi.spyOn(real, 'getVersion');

    const actual = await proxy.getVersion();

    expect(actual).toEqual(version);
    expect(realGetVersionSpy).toBeCalledTimes(1);
  });

  it('should support executing functions directly', async () => {
    const expected = 5;
    const fn: () => Promise<void> = vi.fn().mockResolvedValue(expected);
    const [registerFn, getFn] = defineProxyService('fn', () => fn);
    registerFn();

    isBackgroundMock.mockReturnValue(false);
    const proxyFn = getFn();

    const actual = await proxyFn();

    expect(actual).toBe(expected);
    expect(fn).toBeCalledTimes(1);
  });

  it('should support executing deeply nested functions at multiple depths', async () => {
    const expected1 = 5;
    const expected2 = 6;
    const fn1 = vi.fn<() => Promise<number>>().mockResolvedValue(expected1);
    const fn2 = vi.fn<() => Promise<number>>().mockResolvedValue(expected2);
    const [registerDeepObject, getDeepObject] = defineProxyService('DeepObject', () => ({
      fn1,
      path: {
        to: {
          fn2,
        },
      },
    }));
    registerDeepObject();

    isBackgroundMock.mockReturnValue(false);
    const deepObject = getDeepObject();

    await expect(deepObject.fn1()).resolves.toBe(expected1);
    expect(fn1).toBeCalledTimes(1);
    await expect(deepObject.path.to.fn2()).resolves.toBe(expected2);
    expect(fn2).toBeCalledTimes(1);
  });
});
