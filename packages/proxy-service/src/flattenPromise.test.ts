import { describe, expect, it } from 'vitest';
import { flattenPromise } from './flattenPromise';

describe('flattenPromise', () => {
  it('should convert Promise<Function> to DeepAsync<Function>', async () => {
    const fnPromise = Promise.resolve((x: number, y: number) => x + y);

    const fn = flattenPromise(fnPromise);
    const actual = await fn(1, 2);

    expect(actual).toBe(3);
  });

  it('should convert shallow Promise<Object> to DeepAsync<Object>', async () => {
    const Object = {
      additionalIncrement: 1,
      add(x: number, y: number): number {
        return x + y + this.additionalIncrement;
      },
    };
    const objectPromise = Promise.resolve(Object);

    const object = flattenPromise(objectPromise);
    const actual = await object.add(1, 2);

    expect(actual).toBe(4);
  });

  it('should convert nested Promise<Object> to DeepAsync<Object>', async () => {
    const objectPromise = Promise.resolve({
      math: {
        additionalIncrement: 1,
        add(x: number, y: number): number {
          return x + y + this.additionalIncrement;
        },
      },
    });

    const object = flattenPromise(objectPromise);
    const actual = await object.math.add(1, 2);

    expect(actual).toBe(4);
  });

  it('should convert Promise<Class> to DeepAsync<Class>', async () => {
    const instancePromise = Promise.resolve(
      new (class {
        additionalIncrement = 1;
        add(x: number, y: number): number {
          return x + y + this.additionalIncrement;
        }
      })(),
    );

    const instance = flattenPromise(instancePromise);
    const actual = await instance.add(1, 2);

    expect(actual).toBe(4);
  });
});
