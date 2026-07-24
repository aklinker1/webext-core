export class MockNotImplementedError extends Error {
  constructor(chain: string) {
    super(
      `${chain} not implemented: mock the function yourself using your testing framework, or submit a PR with an in-memory implementation.`,
    );
  }
}

export function createMockNotImplementedProxy(chain: string, obj: any): any {
  return new Proxy(obj, {
    get(target, p, receiver) {
      const value = Reflect.get(target, p, receiver) ?? {};
      if (typeof value !== 'object') return value;
      return createMockNotImplementedProxy(chain + '.' + String(p), value);
    },
    set(target, p, newValue, receiver) {
      return Reflect.set(target, p, newValue, receiver);
    },
    apply() {
      throw new MockNotImplementedError(chain);
    },
  });
}
