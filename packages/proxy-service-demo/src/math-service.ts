import { defineProxyService } from '@webext-core/proxy-service';

class MathService {
  add(x: number, y: number): number {
    console.log(`MathService.add(${x}, ${y})`);
    return x + y;
  }
  subtract(x: number, y: number): number {
    console.log(`MathService.subtract(${x}, ${y})`);
    return x - y;
  }
  multiply(x: number, y: number): number {
    console.log(`MathService.multiply(${x}, ${y})`);
    return x * y;
  }
  divide(x: number, y: number): number {
    console.log(`MathService.divide(${x}, ${y})`);
    if (y === 0) throw Error('Cannot divide by zero');
    return x / y;
  }
  async factorial(x: number): Promise<number> {
    console.log(`MathService.factorial(${x})`);
    await new Promise(res => setTimeout(res, 0));
    return x === 1 ? 1 : x * (await this.factorial(x - 1));
  }
}

export const [registerMathService, getMathService] = defineProxyService(
  'MathService',
  () => new MathService(),
);
