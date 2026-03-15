# aspire-assessment

Aspire-inspired TypeScript web app showcasing card-management interactions for the frontend challenge.

## Implemented scope

- Desktop-first Aspire-style layout (sidebar, primary card panel, card list).
- Preloaded cards on first load.
- Add-card modal with form validation (non-empty name).
- Auto-generated card number and expiry for new cards.
- Freeze/unfreeze toggle with visible state and dimmed frozen appearance.
- LocalStorage persistence (cards survive refresh).
- Strict TypeScript + linting + Vitest tests.

## Prerequisites

- Node.js 20+ recommended
- npm

## Run locally

```bash
npm install
npm run build
python3 -m http.server 4173
```

Open: `http://localhost:4173`

## Development checks

```bash
npm run typecheck
npm run test
npm run lint
npm run build
```

## Project scripts

- `npm run build` — compile TypeScript app into `dist/`
- `npm run typecheck` — strict TypeScript checks
- `npm run test` — run Vitest suite in JSDOM
- `npm run lint` — run ESLint
- `npm run format:check` — verify formatting

## Notes

- The app entrypoint is `index.html`, which loads `dist/main.js` and `styles.css`.
- Card data is stored under the localStorage key `aspire.cards`.
