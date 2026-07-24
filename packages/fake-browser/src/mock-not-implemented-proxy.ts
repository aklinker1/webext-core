export class MockNotImplementedError extends Error {
  constructor(chain: string) {
    super(
      `${chain} not implemented: mock the function yourself using your testing framework, or submit a PR with an in-memory implementation.`,
    );
  }
}

export function createMockNotImplementedProxy(chain: string, obj: any): any {
  return new Proxy(() => {}, {
    get(_, p, receiver) {
      const value = Reflect.get(obj, p, receiver) ?? {};
      if (typeof value !== 'object') return value;
      return createMockNotImplementedProxy(chain + '.' + String(p), value);
    },
    set(_, p, newValue, receiver) {
      return Reflect.set(obj, p, newValue, receiver);
    },
    apply() {
      throw new MockNotImplementedError(chain);
    },
  });
}
