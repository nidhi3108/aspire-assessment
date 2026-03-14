# aspire-assessment

A small TypeScript card-management app skeleton that demonstrates preloaded cards, add-card creation, freeze/unfreeze behavior, and localStorage persistence.

## Scripts

- `npm run lint` — runs ESLint with TypeScript-aware rules.
- `npm run format` — formats the codebase with Prettier.
- `npm run format:check` — verifies formatting without writing changes.
- `npm run typecheck` — runs `tsc --noEmit` strict type checks.
- `npm run test` — runs Vitest test suite in JSDOM.
- `npm run build` — emits distributable TypeScript output to `dist/`.

## Tooling configured

- **ESLint** using `@typescript-eslint` recommended type-checked and stylistic rules.
- **Prettier** formatting with an `.prettierrc` configuration.
- **TypeScript** strict compilation settings for app and build targets.
- **Vitest** for fast tests and DOM-based flow checks.

## Critical flow tests covered

- Startup renders preloaded cards.
- Add-card modal creates card data with generated number/expiry fields.
- Freeze/unfreeze toggles card state and visible UI labels.
- Persistence roundtrip through a local storage mock.
