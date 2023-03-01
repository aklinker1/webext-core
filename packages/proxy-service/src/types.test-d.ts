import { describe, expectTypeOf, it } from 'vitest';
import { defineProxyService } from './defineProxyService';

// https://vitest.dev/guide/testing-types.html

describe('Types', () => {
  describe('getService', () => {
    describe('with a shallow object', () => {
      const realService = {
        property: 'a',
        syncFn: (arg: string): number => 1,
        asyncFn: async (): Promise<number> => 0,
      };
      const [_, getService] = defineProxyService('test', () => realService);
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

    describe('with a raw function', () => {
      it('should make sync functions async', () => {
        const realService = (arg: string) => {};
        const [_, getService] = defineProxyService('test', () => realService);
        const service = getService();

        expectTypeOf(service).toEqualTypeOf<(arg: string) => Promise<void>>();
      });

      it('should return the same type when the function is already async', () => {
        const realService = async (arg: string) => 1;
        const [_, getService] = defineProxyService('test', () => realService);
        const service = getService();

        expectTypeOf(service).toEqualTypeOf(realService);
      });
    });

    describe('with a class instance', () => {
      class RealService {
        property = 'a';
        syncFn(arg: string) {
          return 1;
        }
        async asyncFn() {
          return 2;
        }
      }
      const [_, getService] = defineProxyService('test', () => new RealService());
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

    describe('with a nested object', () => {
      const realService = {
        a: {
          b: {
            async fn(arg: string): Promise<string> {
              return arg;
            },
            c: {
              d: {
                e: {
                  fn(arg: boolean): string {
                    return '';
                  },
                },
              },
            },
          },
        },
      };
      const [_, getService] = defineProxyService('test', () => realService);
      const service = getService();

      it('should return the functions at the same depth', () => {
        expectTypeOf(service.a.b.fn).toEqualTypeOf<(arg: string) => Promise<string>>();
        expectTypeOf(service.a.b.c.d.e.fn).toEqualTypeOf<(arg: boolean) => Promise<string>>();
      });
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
