import { registerService } from '@webext-core/proxy-service';

export default defineBackground(() => {
  registerService(MathServiceKey, new MathService());
});
