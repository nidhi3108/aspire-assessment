# Aspire Assessment

## Overview
A React + TypeScript + Vite frontend application simulating an Aspire banking dashboard. Features a card management UI with debit card display, transaction history, and card actions.

## Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Testing**: Vitest
- **Linting**: ESLint + Prettier

## Project Structure
- `src/App.tsx` – Main React app component (dashboard UI)
- `src/main.tsx` – React entry point
- `src/main.ts` – Vanilla TS entry point (alternative app logic)
- `src/app.ts` – Vanilla TS app factory
- `src/cards.ts` – Card data model and storage logic
- `src/index.ts` – Re-exports
- `src/models/domain.ts` – TypeScript domain types
- `src/components/CardCarousel.tsx` – Card carousel component
- `src/hooks/useCards.tsx` – React hook for card state
- `src/utils/cardGenerators.ts` – Card generation utilities
- `src/styles/global.css` – Global styles

## Running the App
- **Dev server**: `npm run dev` (port 5000)
- **Build**: `npm run build`
- **Tests**: `npm test`

## Deployment
Configured as a static site deployment — builds with `npm run build` and serves from `dist/`.

## Key Notes
- `package.json` was fixed (had duplicate `devDependencies` and misplaced scripts from the original import)
- `tsconfig.json` was fixed (had duplicate/merged compiler options from two different configs)
- Vite configured with `host: '0.0.0.0'`, `port: 5000`, `allowedHosts: true` for Replit proxy compatibility
