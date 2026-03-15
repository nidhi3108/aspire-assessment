import { createApp } from './app.js';

const root = document.querySelector<HTMLElement>('#app');
if (!root) {
  throw new Error('Expected #app element to exist');
}

createApp(root, window.localStorage);
