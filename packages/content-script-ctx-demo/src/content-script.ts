import { defineContentScript } from '@webext-core/content-script-ctx';
import { localExtStorage } from '@webext-core/storage';

defineContentScript('content-script.ts', ctx => {
  console.log('Hello google.com!');

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
  let currentIndex = 0;

  function setBorder() {
    const color = colors[currentIndex];
    console.log(`Set border to ${color}`);
    document.body.style.border = `4px solid ${color}`;
    if (ctx.isValid()) localExtStorage.setItem('lastColor', color);
  }

  ctx.setInterval(() => {
    currentIndex = (currentIndex + 1) % colors.length;
    document.body.style.transition = 'all 2s';
    setBorder();
  }, 1500);
  setBorder();
});
