export default defineBackground(() => {
  registerMathService(async () => {
    const { MathService } = await import('../utils/math-service');
    return new MathService();
  });
});
