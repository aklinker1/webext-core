import { registerService } from '@webext-core/proxy-service';

export default defineBackground(() => {
  registerService(MATH_SERVICE_KEY, new MathService());
});
