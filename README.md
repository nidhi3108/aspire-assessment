# Aspire Assessment – Frontend Project

> **Hosted URL (fill before submission):** `https://<your-deployment-url>`  
> **Repository URL (fill before submission):** `https://github.com/<your-username>/<your-repo>`

## 1) Project overview

This project is a frontend implementation of the Aspire assessment flow, focused on card management interactions and UI state transitions.

### Implemented scope

#### Must-have features

- [x] Card list/grid rendering from mocked API data
- [x] Add new card flow
- [x] Freeze / unfreeze card actions
- [x] Responsive desktop layout
- [x] Build + production preview setup

#### Optional features

- [ ] Mobile-specific layout refinements *(if implemented, mark as done and include screenshot below)*
- [ ] Animation/micro-interactions
- [ ] Persistence (local storage / backend integration)
- [ ] Unit/integration tests

---

## 2) Prerequisites

Install the following on your machine:

- **Node.js**: `>=18.x`
- **npm**: `>=9.x`

Check versions:

```bash
node -v
npm -v
```

---

## 3) Install and run (exact commands)

From the project root:

```bash
npm install
npm run dev
```

Then open the local URL shown in terminal (typically `http://localhost:5173`).

---

## 4) Build and preview commands

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 5) Architecture notes

### Component structure

A typical structure used in this project:

- `App` / page-level container
- `CardList` for rendering cards collection
- `CardItem` for a single card view
- `AddCardModal` / `AddCardForm` for new card creation
- `CardActions` for freeze/unfreeze and related controls

### State management

- Local UI state is managed with React hooks (`useState`, `useReducer` where useful).
- Shared card state is lifted to a page/container level and passed through props.
- Derived state (e.g., active card, frozen cards) is computed from canonical card data.

### API mocking strategy

- Mocked card/account data is served from static mock files or mock service modules.
- Async behavior is simulated with promise-based helpers / delayed responses.
- Components are built to be easily switched from mock services to real API clients.

---

## 6) Behavior details

### Add-card behavior

- User opens add-card flow via **Add card** CTA.
- Form validates required fields.
- On submit, a new card object is created and appended to card list state.
- New card appears immediately in UI (optimistic update style).

### Freeze / unfreeze behavior

- **Freeze** toggles card status to frozen and disables restricted card actions.
- **Unfreeze** re-enables those actions.
- UI clearly indicates frozen state (label, badge, or style treatment).
- State change is reflected immediately and remains consistent across card switches.

---

## 7) Known limitations

- API is mocked; no real backend persistence.
- Page refresh may reset state unless persistence is implemented.
- Error/empty/loading scenarios may be basic depending on current scope.
- Accessibility and test coverage can be expanded.

---

## 8) Screenshots / GIFs

> Replace placeholders below with actual assets before final submission.

### Desktop

![Desktop – main card management flow](./docs/screenshots/desktop-main.png)

### Mobile *(if implemented)*

![Mobile – responsive card management flow](./docs/screenshots/mobile-main.png)

### Interaction GIF *(optional but recommended)*

![Add card + freeze/unfreeze interaction](./docs/screenshots/add-freeze-flow.gif)

---

## 9) Submission checklist

- [ ] Hosted deployment URL filled
- [ ] Repository URL filled
- [ ] Scope checkboxes updated to match actual implementation
- [ ] Screenshots/GIFs added and paths verified
- [ ] README commands verified in fresh clone
