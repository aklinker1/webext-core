import { describe, expectTypeOf, it } from 'vitest';
import { defineProxyService } from './defineProxyService';

// https://vitest.dev/guide/testing-types.html

describe('Types', () => {
  describe('getService', () => {
    function createService(arg: string) {
      return {
        property: 'a',
        syncFn(arg: string): number {
          throw Error('Not implemented');
        },
        async asyncFn(): Promise<number> {
          throw Error('Not implemented');
        },
      };
    }
    const [_, getService] = defineProxyService('test', createService);
    const service = getService();

    it('should make sync functions async', () => {
      expectTypeOf(service.syncFn).toEqualTypeOf<(arg: string) => Promise<number>>();
    });

    it('should not change async functions', () => {
      expectTypeOf(service.asyncFn).toEqualTypeOf<() => Promise<number>>();
    });

    it("should make properties never since they can't be accessed synchronously", () => {
      expectTypeOf(service.property).toBeNever();
    });
  });

  describe('registerService', () => {
    it('should require args when the init function has them', () => {
      const createService = (arg1: string, arg2: number) => ({});
      const [registerService] = defineProxyService('test', createService);

      expectTypeOf(registerService).parameters.toEqualTypeOf<[string, number]>();
    });

    it("should not require args when the init function doesn't have any", () => {
      const createService = () => ({});
      const [registerService] = defineProxyService('test', createService);

      expectTypeOf(registerService).parameters.toEqualTypeOf<[]>();
    });

    it("should return the actual service, not it's deep async version", () => {
      const createService = () => ({ syncFn: () => {} });
      const [registerService] = defineProxyService('test', createService);

      expectTypeOf(registerService).returns.toEqualTypeOf<ReturnType<typeof createService>>();
    });
  });
});
