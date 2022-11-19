import { defineProxyService } from './defineProxyService';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { isBackground } from './isBackground';

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
  });

  it("getService should fail to get the service in the background if one hasn't been registered", () => {
    const [_, getTestService] = defineTestService();
    isBackgroundMock.mockReturnValue(true);

    expect(getTestService).toThrowError();
  });

  it('getService should return a proxy in other contexts', () => {
    const [_, getTestService] = defineTestService();
    isBackgroundMock.mockReturnValue(false);

    expect(getTestService()).toEqual({});
  });

  it('should defer execution of the proxy service methods to the real service methods', async () => {
    const version = 10;
    const [registerTestService, getTestService] = defineTestService();
    isBackgroundMock.mockReturnValue(false);
    const proxy = getTestService();
    isBackgroundMock.mockReturnValue(true);
    registerTestService(version);
    const real = getTestService();
    const realGetVersionSpy = vi.spyOn(real, 'getVersion');

    const actual = await proxy.getVersion();

    expect(actual).toEqual(version);
    expect(realGetVersionSpy).toBeCalledTimes(1);
  });
});
