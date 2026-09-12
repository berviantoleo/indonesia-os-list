# Upgrade Dependencies Plan

## Top-Level Overview

**Goal:** Bring all project dependencies to their latest versions, replace the maintenance-mode Vuex 4 with Pinia 4, and replace Moment.js with date-fns. The migration must keep the app building, all tests passing, and linting clean.

**Scope:**
- Build tooling: `vite` 6 → 8, `@vitejs/plugin-vue` 5 → 6
- Test tooling: `vitest` 3 → 5, `@vitest/coverage-v8` 3 → 5, `@vue/test-utils` 2.4.6 → 2.5.0, `jsdom` 26 → 29 (not 30; v30 requires Node 22.22.2/24.15+)
- Language: `typescript` ~5.9 → 7.x
- State management: `vuex` 4 → `pinia` 4 (remove vuex, add pinia)
- Date utility: `moment` → `date-fns` (remove moment, add date-fns)
- All other packages already at latest — no change needed

**Packages confirmed already at latest:**
- `vue` 3.5.42 ✓
- `vue-router` 5.3.1 ✓
- `@oruga-ui/oruga-next` 0.14.3 ✓
- `@oruga-ui/theme-oruga` 0.10.0 ✓
- `bulma` 1.0.4 ✓
- `@mdi/font` 7.4.47 ✓
- `cypress` 16.0.0 ✓
- `eslint` 10.10.0 ✓
- `prettier` 3.9.6 ✓
- `sass` 1.104.0 ✓
- `globals` 17.12.0 ✓
- All `@eslint/*` and `@vue/eslint-config-*` packages ✓

---

## Sub-Tasks

---

### Sub-Task 1 — Upgrade build tooling (Vite + plugin-vue)

**Status:** [ ] pending

**Intent:**
Upgrade `vite` from 6 → 8 and `@vitejs/plugin-vue` from 5 → 6 to get the latest Rolldown-based build engine. `@vitejs/plugin-vue` 6.x supports `vite` ^5 || ^6 || ^7 || ^8 and `vue` ^3.2.25, so it is fully compatible.

**Expected Outcomes:**
- `package.json` lists `"vite": "^8.3.0"` and `"@vitejs/plugin-vue": "^6.0.8"`
- `yarn install` resolves without peer dependency errors
- `yarn build` completes successfully

**Todo List:**
1. In `package.json`, update `"vite": "^6.0.0"` → `"^8.3.0"` and `"@vitejs/plugin-vue": "^5.0.0"` → `"^6.0.8"`
2. Run `yarn install` to update `yarn.lock`
3. Run `yarn build` to verify the build still works

**Relevant Context:**
- [`vite.config.ts`](vite.config.ts) — no Vite 6-specific API usage; `defineConfig` import is version-agnostic
- [`package.json`](package.json) lines 40–41 (current version pins)

---

### Sub-Task 2 — Upgrade test tooling (Vitest + jsdom + @vue/test-utils)

**Status:** [ ] pending

**Intent:**
Upgrade the unit testing stack: `vitest` 3 → 5, `@vitest/coverage-v8` 3 → 5, `jsdom` 26 → 30, and `@vue/test-utils` 2.4.6 → 2.5.0. Node 26 is confirmed in use, satisfying jsdom 30's engine requirement of `^22.22.2 || ^24.15.0 || >=26.0.0`. Vitest 5 requires `vite` >=6.4.0, satisfied by the vite 8 upgrade in Sub-Task 1.

**Expected Outcomes:**
- `package.json` lists `"vitest": "^5.0.0"`, `"@vitest/coverage-v8": "^5.0.0"`, `"jsdom": "^29.0.0"`, `"@vue/test-utils": "^2.5.0"`
- `yarn install` resolves without peer dependency errors
- `yarn test:unit` passes

**Todo List:**
1. In `package.json`, update:
   - `"vitest": "^3.0.0"` → `"^5.0.0"`
   - `"@vitest/coverage-v8": "^3.0.0"` → `"^5.0.0"`
   - `"jsdom": "^26.0.0"` → `"^30.0.0"`
   - `"@vue/test-utils": "^2.4.6"` → `"^2.5.0"`
2. Run `yarn install`
3. Run `yarn test:unit` and verify all specs pass

**Relevant Context:**
- [`vite.config.ts`](vite.config.ts) `test` block — environment is `jsdom`; no jsdom-specific APIs used directly in tests
- [`tests/unit/example.spec.ts`](tests/unit/example.spec.ts) — uses `shallowMount` from `@vue/test-utils`; no Vitest-3-specific APIs that would break in Vitest 5

---

### Sub-Task 3 — Upgrade TypeScript

**Status:** [ ] pending

**Intent:**
Upgrade `typescript` from `~5.9.3` to `^7.0.2`. TypeScript 7 is backward compatible for syntax. The `tsconfig.json` uses `moduleResolution: bundler` and `target: ESNext` which remain valid in TS 7.

**Expected Outcomes:**
- `package.json` lists `"typescript": "^7.0.2"`
- `yarn install` resolves without errors
- `yarn build` and `yarn test:unit` still pass (no new type errors)

**Todo List:**
1. In `package.json`, update `"typescript": "~5.9.3"` → `"^7.0.2"`
2. Run `yarn install`
3. Run `yarn build` and `yarn test:unit` and fix any new type errors surfaced by the stricter TS 7 compiler

**Relevant Context:**
- [`tsconfig.json`](tsconfig.json) — `strict: true`, `moduleResolution: "bundler"`, `target: "ESNext"` — all remain valid in TS 7
- [`src/views/home.ts`](src/views/home.ts), [`src/router/index.ts`](src/router/index.ts), [`src/store/index.ts`](src/store/index.ts) — files most likely to surface new type errors

---

### Sub-Task 4 — Replace Vuex with Pinia

**Status:** [ ] pending

**Intent:**
Remove `vuex` (maintenance mode) and replace it with `pinia` 4, which is the officially recommended Vue 3 state management library. The current Vuex store is empty (no state, mutations, actions, or modules), so the migration is a straight replacement with no logic to port.

Pinia 4 peer-requires `vue ^3.5.11` and `typescript >=5.6.0` — both satisfied after Sub-Tasks 1–3.

**Expected Outcomes:**
- `vuex` removed from `package.json` dependencies
- `pinia` 4 added to `package.json` dependencies
- `src/store/index.ts` rewritten to export a minimal Pinia store using `defineStore`
- `src/main.ts` updated to use `createPinia()` instead of the Vuex store
- `yarn install`, `yarn build`, and `yarn test:unit` all pass

**Todo List:**
1. In `package.json`, remove `"vuex": "^4.1.0"` and add `"pinia": "^4.0.3"` under dependencies
2. Rewrite [`src/store/index.ts`](src/store/index.ts):
   - Import `defineStore` from `pinia`
   - Export a minimal `useMainStore` using `defineStore('main', { state: () => ({}) })`
3. In [`src/main.ts`](src/main.ts):
   - Replace `import { store } from "./store"` with `import { createPinia } from 'pinia'`
   - Replace `app.use(store)` with `app.use(createPinia())`
4. Run `yarn install`, `yarn build`, `yarn test:unit`

**Relevant Context:**
- [`src/store/index.ts`](src/store/index.ts) — currently 8 lines, empty store
- [`src/main.ts`](src/main.ts) lines 5, 11 — the only two Vuex integration points

---

### Sub-Task 5 — Replace Moment.js with date-fns

**Status:** [ ] pending

**Intent:**
Remove `moment` (maintenance mode, 67 kB gzipped) and replace it with `date-fns` 4 (tree-shakeable, ESM-native). The only usage is a single `changeFormat()` method in `src/views/home.ts` that formats a date string to `"MMMM Do YYYY"` (e.g. "February 11th 2005"). The equivalent in date-fns 4 is `format(parseISO(date), 'MMMM do yyyy')`.

**Expected Outcomes:**
- `moment` removed from `package.json` dependencies
- `date-fns` 4 added to `package.json` dependencies
- [`src/views/home.ts`](src/views/home.ts) updated to use `date-fns` `format` and `parseISO`
- `yarn install`, `yarn build`, `yarn test:unit` all pass

**Todo List:**
1. In `package.json`, remove `"moment": "^2.30.1"` and add `"date-fns": "^4.4.0"` under dependencies
2. In [`src/views/home.ts`](src/views/home.ts):
   - Replace `import moment from "moment"` with `import { format, parseISO } from "date-fns"`
   - Replace `return moment(date).format("MMMM Do YYYY")` with `return format(parseISO(date), 'MMMM do yyyy')`
3. Run `yarn install`, `yarn build`, `yarn test:unit`

**Relevant Context:**
- [`src/views/home.ts`](src/views/home.ts) lines 1, 67–69 — the only Moment usage in the project
- date-fns 4 format token reference: `MMMM` = full month name, `do` = day with ordinal suffix, `yyyy` = 4-digit year (note: lowercase `d` + ordinal `o`, not uppercase `D` as in Moment)

---

## Upgrade Summary Table

| Package | From | To | Type | Note |
|---|---|---|---|---|
| `vite` | ^6.0.0 | ^8.3.0 | devDep | Rolldown engine |
| `@vitejs/plugin-vue` | ^5.0.0 | ^6.0.8 | devDep | Compat with vite 8 |
| `vitest` | ^3.0.0 | ^5.0.0 | devDep | Requires vite >=6.4 |
| `@vitest/coverage-v8` | ^3.0.0 | ^5.0.0 | devDep | Must match vitest |
| `jsdom` | ^26.0.0 | ^30.0.0 | devDep | Node 26 confirmed |
| `@vue/test-utils` | ^2.4.6 | ^2.5.0 | devDep | Minor patch |
| `typescript` | ~5.9.3 | ^7.0.2 | devDep | Major upgrade |
| `vuex` | ^4.1.0 | — | dep | Removed |
| `pinia` | — | ^4.0.3 | dep | Replaces vuex |
| `moment` | ^2.30.1 | — | dep | Removed |
| `date-fns` | — | ^4.4.0 | dep | Replaces moment |
