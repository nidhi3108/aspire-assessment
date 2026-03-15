# Aspire Assessment

## Overview
A React + TypeScript + Vite frontend simulating an Aspire banking dashboard. Features interactive card management — add cards, freeze/unfreeze, view card details — with localStorage persistence.

## Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Testing**: Vitest + jsdom
- **Linting**: ESLint + Prettier

## Project Structure

### React App (browser entry)
- `index.html` – Loads `/src/main.tsx`
- `src/main.tsx` – React entry, mounts to `#root`
- `src/App.tsx` – Main dashboard layout using `useCards` + `CardCarousel`
- `src/components/CardCarousel.tsx` – Interactive card list with add/freeze modal
- `src/hooks/useCards.tsx` – Card state with localStorage persistence
- `src/models/domain.ts` – TypeScript domain types (`Card`, `Transaction`, etc.)
- `src/utils/cardGenerators.ts` – Random card number / expiry generation
- `src/styles/global.css` – Global CSS for the dashboard layout

### Vanilla TS App (tested via unit tests)
- `src/app.ts` – DOM-based card app factory
- `src/cards.ts` – Card data model, CRUD, localStorage logic
- `src/main.ts` – Vanilla TS entry (mounts to `#app`, not used in browser)
- `src/index.ts` – Re-exports for the vanilla TS module
- `styles.css` – Root-level CSS for the vanilla TS app

### Tests
- `tests/app.test.ts` – Unit tests for the vanilla TS app (5 tests)

## Running the App
- **Dev server**: `npm run dev` (port 5000, host 0.0.0.0)
- **Build**: `npm run build`
- **Tests**: `npm test`
- **Type check**: `npm run typecheck`

## Deployment
Configured as a static site — builds with `npm run build`, serves from `dist/`.

## Fixes Applied (from broken import)
1. `package.json` — had duplicate `devDependencies` and scripts mixed in; unified
2. `tsconfig.json` — had merged conflict content from two different configs; fixed with proper Bundler + JSX settings; removed project references
3. `tsconfig.build.json` — updated to inherit from fixed tsconfig
4. `index.html` — was pointing to `./dist/main.js` (vanilla TS build output); fixed to load `/src/main.tsx` (React entry)
5. `App.tsx` — was fully static/hardcoded; rewritten to use `CardCarousel` + `useCards`
6. `src/app.ts` — had unused `info` variable; fixed to properly use it as a wrapper element
7. `vitest.config.ts` — added React plugin + globals
8. `eslint.config.js` — now covers `.tsx` files in addition to `.ts`
9. `vite.config.ts` — configured `host: 0.0.0.0`, `port: 5000`, `allowedHosts: true`
