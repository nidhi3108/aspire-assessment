# Codebase File Reference

## React App (what runs in the browser)

| File | What's in it |
|------|-------------|
| `index.html` | The HTML shell — one `<div id="root">` and a script tag loading the React app |
| `src/main.tsx` | React entry point — calls `ReactDOM.createRoot` and mounts `<App />` |
| `src/App.tsx` | The main dashboard layout — sidebar nav, balance header, tabs, and wires together `CardCarousel` + `useCards` |
| `src/components/CardCarousel.tsx` | The interactive card list UI — renders each card, handles selection, shows freeze/unfreeze button, and opens the "Add Card" modal |
| `src/components/CardCarousel.css` | Styles specific to the card carousel (card tiles, modal backdrop, action buttons) |
| `src/hooks/useCards.tsx` | All card state logic — loads cards from localStorage, handles adding cards, selecting a card, and toggling freeze |
| `src/models/domain.ts` | TypeScript type definitions — `Card`, `Transaction`, `CardStatus` |
| `src/utils/cardGenerators.ts` | Utility functions — generates a random 16-digit card number and an expiry date 3 years from now |
| `src/styles/global.css` | Global CSS — the full dashboard layout (sidebar, content grid, panels, responsive breakpoints) |

---

## Vanilla TypeScript App (tested via unit tests, not browser-facing)

| File | What's in it |
|------|-------------|
| `src/app.ts` | A DOM-based card app factory (`createApp`) — builds the entire UI with vanilla JS, handles add/freeze interactions |
| `src/cards.ts` | Card data logic — `Card` type, `loadCards`, `saveCards`, `createCard`, `toggleFreeze`, preloaded default cards |
| `src/main.ts` | Entry point for the vanilla app — mounts to `#app`, injects inline styles, calls `createApp` |
| `src/index.ts` | Re-exports everything from `app.ts` and `cards.ts` as a public module API |
| `styles.css` | Root-level CSS used by the vanilla TS app |

---

## Tests

| File | What's in it |
|------|-------------|
| `tests/app.test.ts` | 5 unit tests for the vanilla TS app — tests startup rendering, adding a card, selecting a card, freeze/unfreeze toggle, and localStorage persistence |

---

## Config Files (no app logic)

| File | What's in it |
|------|-------------|
| `vite.config.ts` | Vite dev server config — React plugin, port 5000, host 0.0.0.0 |
| `vitest.config.ts` | Vitest config — React plugin, jsdom environment, globals enabled |
| `tsconfig.json` | TypeScript config for src + tests — Bundler module resolution, JSX support |
| `tsconfig.node.json` | TypeScript config for vite.config.ts only |
| `tsconfig.build.json` | TypeScript config for production builds |
| `eslint.config.js` | ESLint rules for `.ts` and `.tsx` files |
| `package.json` | Dependencies and npm scripts |
| `.prettierrc` | Prettier formatting config |
