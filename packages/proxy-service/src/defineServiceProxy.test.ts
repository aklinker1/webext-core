import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fakeBrowser } from '@webext-core/fake-browser';
import { defineServiceProxy } from './defineServiceProxy';
import { isBackground } from './isBackground';

vi.mock('webextension-polyfill');

vi.mock('./isBackground', () => ({
  isBackground: vi.fn(),
}));
const isBackgroundMock = vi.mocked(isBackground);

class ShakableTestService {
  private version: number;

  constructor(version: number) {
    this.version = version;
  }

  getVersion() {
    return this.version;
  }

  getNextVersion() {
    return Promise.resolve(this.version + 1);
  }
}

const defineShakableTestService = () =>
  defineServiceProxy<ShakableTestService>('ShakableTestService');

describe('defineServiceProxy', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    fakeBrowser.reset();
  });

  it("getService should fail to get the service in the background if one hasn't been registered", () => {
    const [_, getShakableTestService] = defineShakableTestService();
    isBackgroundMock.mockReturnValue(true);

    expect(getShakableTestService).toThrowError();
  });

  it('getService should return a proxy in other contexts', () => {
    const [registerShakableTestService, getShakableTestService] = defineShakableTestService();
    registerShakableTestService(() => new ShakableTestService(1));
    isBackgroundMock.mockReturnValue(false);

    // @ts-expect-error: __proxy is not apart of the type, but it's there
    expect(getShakableTestService().__proxy).toEqual(true);
  });

  it('should defer execution of the proxy service methods to the real service methods', async () => {
    const version = 10;
    const [registerShakableTestService, getShakableTestService] = defineShakableTestService();
    await registerShakableTestService((ver: number) => new ShakableTestService(ver), version);

    isBackgroundMock.mockReturnValue(true);
    const real = getShakableTestService();
    isBackgroundMock.mockReturnValue(false);
    const proxy = getShakableTestService();
    const realGetVersionSpy = vi.spyOn(real, 'getVersion');

    const actual = await proxy.getVersion();

    expect(actual).toEqual(version);
    expect(realGetVersionSpy).toBeCalledTimes(1);
  });

  it('should support executing functions directly', async () => {
    const expected = 5;
    const fn: () => Promise<void> = vi.fn().mockResolvedValue(expected);
    const [registerFn, getFn] = defineServiceProxy<typeof fn>('fn');
    registerFn(() => fn);

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
    const deepObj = {
      fn1,
      path: {
        to: {
          fn2,
        },
      },
    };
    const [registerDeepObject, getDeepObject] = defineServiceProxy<typeof deepObj>('DeepObject');
    registerDeepObject(() => deepObj);

    isBackgroundMock.mockReturnValue(false);
    const deepObject = getDeepObject();

    await expect(deepObject.fn1()).resolves.toBe(expected1);
    expect(fn1).toBeCalledTimes(1);
    await expect(deepObject.path.to.fn2()).resolves.toBe(expected2);
    expect(fn2).toBeCalledTimes(1);
  });
});
