# aspire-assessment

Aspire-inspired TypeScript web app showcasing card management interactions for the FE challenge.

## Implemented challenge scope

- Desktop-focused UI layout with sidebar, active card, and cards list.
- Preloaded cards at startup.
- Add-card modal that accepts card holder name.
- Randomly generated card number and expiry on create.
- Freeze/unfreeze behavior with toggled label and dimmed frozen card style.
- LocalStorage persistence and reload support.
- Strict TypeScript + tests for critical user flows.

## Getting started

```bash
npm install
npm run build
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Scripts

- `npm run build` - compile app to `dist/`
- `npm run typecheck` - run strict TypeScript checks
- `npm run test` - run unit/integration tests in JSDOM
- `npm run lint` - run ESLint
- `npm run format:check` - verify formatting
