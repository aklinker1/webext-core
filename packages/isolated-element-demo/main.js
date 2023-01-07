import { createIsolatedElement } from '@webext-core/isolated-element';
import isolatedStyles from './isolated-style.css?raw';

const createLink = () => {
  const a = document.createElement('a');
  a.href = 'https://github.com/aklinker1/webext-core';
  a.textContent = 'Link';
  return a;
};

// Create a link that uses the global red color style
document.body.appendChild(createLink());

// Create an isolated link that doesn't use the red color style
createIsolatedElement({
  name: 'isolated-style',
  css: { textContent: isolatedStyles },
}).then(({ isolatedElement, parentElement }) => {
  // Add link inside isolation
  isolatedElement.appendChild(createLink());
  // Add isolated element to dom
  document.body.appendChild(parentElement);
});
