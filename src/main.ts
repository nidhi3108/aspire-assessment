import { createApp } from './app.js';

const ensureStyles = (): void => {
  const style = document.createElement('style');
  style.textContent = `
    body { margin: 0; font-family: Inter, Arial, sans-serif; background: #f5f9ff; color: #0c365a; }
    .page { display: grid; grid-template-columns: 300px 1fr; min-height: 100vh; }
    .sidebar { background: #0c365a; color: #fff; padding: 48px 32px; }
    .balance { font-size: 32px; font-weight: 700; }
    .primary-btn { background: #325baf; color: #fff; border: 0; border-radius: 8px; padding: 10px 14px; cursor: pointer; }
    .content { padding: 48px; }
    .hero-card { background: linear-gradient(130deg, #01d167, #16b870); color: #fff; border-radius: 14px; max-width: 440px; padding: 24px; }
    .brand { text-transform: uppercase; font-weight: 700; }
    .holder { margin-top: 32px; font-size: 22px; font-weight: 700; }
    .number { letter-spacing: 3px; margin: 20px 0; }
    .cards-list { list-style: none; padding: 0; margin: 22px 0 0; display: grid; gap: 14px; max-width: 640px; }
    .card-row { background: #fff; border: 1px solid #e2e6ea; border-radius: 12px; padding: 16px; display: flex; justify-content: space-between; }
    .card-row.frozen { opacity: 0.45; }
    .modal-overlay { position: fixed; inset: 0; display: grid; place-items: center; background: rgb(0 0 0 / 30%); }
    .modal { width: 340px; background: #fff; border-radius: 12px; padding: 16px; display: grid; gap: 12px; }
    .modal input { padding: 10px; border: 1px solid #d5d9df; border-radius: 8px; }
    .modal-actions { display: flex; justify-content: end; gap: 8px; }
  `;
  document.head.append(style);
};

const root = document.querySelector<HTMLElement>('#app');
if (!root) {
  throw new Error('Expected #app element to exist');
}

ensureStyles();
createApp(root, window.localStorage);
