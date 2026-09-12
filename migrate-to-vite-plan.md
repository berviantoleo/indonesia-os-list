# Migrate Vue CLI → Vite

## Overview

Replace `@vue/cli-service` (webpack-based) with Vite as the build tool and dev server. The unit test runner is also migrated from Jest (via `@vue/cli-plugin-unit-jest`) to Vitest, which runs natively in the same Vite pipeline. The e2e Cypress setup is kept but its `plugins/index.js` shim (which existed only for webpack integration) is cleaned up.

Scope:
- Remove all `@vue/cli-*` packages
- Install `vite`, `@vitejs/plugin-vue`, and `vitest`
- Replace `vue.config.js` with `vite.config.ts`
- Fix `index.html` (move to project root, replace webpack template variables)
- Update `tsconfig.json` (drop `webpack-env` type, target `ESNext`)
- Migrate `jest.config.js` to a Vitest config block inside `vite.config.ts`
- Update npm scripts in `package.json` following Vite/Vitest conventions
- Fix the one source-code quirk that uses a webpack-ism (`~` in SCSS import)
- Fix the webpack magic comment in `src/router/index.ts` (cosmetic but clean)
- Add a second unit test case to `tests/unit/example.spec.ts` (for `Home.vue`)

Non-goals:
- Changing the application logic, UI, or routes
- Switching from Vue Router hash-history to HTML5 history
- Updating dependencies unrelated to the build toolchain

---

## Sub-Tasks

### 1. Replace dependencies

**Intent**  
Remove all Vue CLI packages and Babel packages that were only needed for webpack/Jest, and add the Vite + Vitest packages.

**Expected Outcomes**  
- `package.json` no longer references any `@vue/cli-*` package.
- `vite`, `@vitejs/plugin-vue`, `vitest`, `@vitest/coverage-v8`, and `jsdom` are present in `devDependencies`.
- `babel-jest`, `@babel/core`, `@babel/preset-env`, `@vue/vue3-jest`, `ts-jest`, `jest`, and `@types/jest` are removed (Vitest handles transpilation natively via Vite).
- `@vue/test-utils` is kept (Vitest still uses it).
- `sass` and `typescript` are kept.
- `sass-loader` is removed (Vite uses the `sass` package directly, no loader needed).
- Scripts follow Vite/Vitest conventions:
  - `serve` → `dev` (maps to `vite`)
  - `build` → `vite build`
  - `preview` → `vite preview` (new — standard Vite convention)
  - `test:unit` → `vitest run`
  - `test:e2e` → `cypress run`
  - `lint` stays unchanged

**Todo List**  
1. In `package.json`, remove from `devDependencies`:  
   `@vue/cli-plugin-e2e-cypress`, `@vue/cli-plugin-router`, `@vue/cli-plugin-typescript`, `@vue/cli-plugin-unit-jest`, `@vue/cli-plugin-vuex`, `@vue/cli-service`, `babel-jest`, `@babel/core`, `@babel/preset-env`, `@vue/vue3-jest`, `ts-jest`, `jest`, `@types/jest`, `sass-loader`.
2. Add to `devDependencies`:  
   `vite`, `@vitejs/plugin-vue`, `vitest`, `@vitest/coverage-v8`, `jsdom`.
3. Update the `scripts` block:
   - Rename `serve` → `dev`, value `vite`
   - Change `build` value to `vite build`
   - Add `preview` → `vite preview`
   - Change `test:unit` value to `vitest run`
   - Change `test:e2e` value to `cypress run`
   - `lint` stays unchanged
4. Run `yarn install` to apply changes.

**Relevant Context**  
- [`package.json`](package.json)

**Status** `[x] done`

---

### 2. Create `vite.config.ts`

**Intent**  
Replace `vue.config.js` with a Vite configuration file that replicates the only non-default setting: a conditional `base` path for the GitHub Pages deployment (`/indonesia-os-list/` in production, `/` otherwise).  
Also embed the Vitest configuration so a separate jest config file is no longer needed.

**Expected Outcomes**  
- `vite.config.ts` exists at the project root.
- `vue.config.js` is deleted.
- `jest.config.js` is deleted.
- Running `vite build` produces output under `dist/` with the correct base path.
- Running `vitest run` picks up `tests/unit/**/*.spec.ts`.

**Todo List**  
1. Create `vite.config.ts` with:
   - `@vitejs/plugin-vue` plugin
   - `base` set to `/indonesia-os-list/` when `NODE_ENV === 'production'`, `/` otherwise
   - `resolve.alias` mapping `@` → `src/`
   - `test` block (Vitest): `globals: true`, `environment: 'jsdom'`, `include: ['tests/unit/**/*.spec.ts']`
2. Delete `vue.config.js`.
3. Delete `jest.config.js`.

**Relevant Context**  
- [`vue.config.js`](vue.config.js) — current settings to replicate
- [`jest.config.js`](jest.config.js) — superseded by Vitest config

**Status** `[x] done`

---

### 3. Fix `index.html`

**Intent**  
Vite requires `index.html` at the project root (not in `public/`) and uses its own template syntax instead of webpack's `htmlWebpackPlugin` EJS tokens.

**Expected Outcomes**  
- `index.html` exists at the project root.
- `public/index.html` is deleted.
- The file no longer contains `<%= BASE_URL %>` or `<%= htmlWebpackPlugin.options.title %>`.
- A `<script type="module" src="/src/main.ts"></script>` entry point is present.
- The favicon link uses `/favicon.ico` (Vite serves `public/` statically at root).

**Todo List**  
1. Create `index.html` at the project root based on the content of `public/index.html`.
2. Replace `<link rel="icon" href="<%= BASE_URL %>favicon.ico">` with `<link rel="icon" href="/favicon.ico">`.
3. Replace `<title><%= htmlWebpackPlugin.options.title %></title>` with `<title>Indonesia OS List</title>`.
4. Replace the `<!-- built files will be auto injected -->` comment with `<script type="module" src="/src/main.ts"></script>`.
5. Fix the `<noscript>` message to use a plain string (remove the EJS variable).
6. Delete `public/index.html`.

**Relevant Context**  
- [`public/index.html`](public/index.html)
- [`src/main.ts`](src/main.ts)

**Status** `[x] done`

---

### 4. Update `tsconfig.json`

**Intent**  
Remove the `webpack-env` type reference (which no longer exists) and set `target`/`module` to values compatible with Vite's ESM-first pipeline. Also add `vite/client` to types so Vite's `import.meta.env` is recognised.

**Expected Outcomes**  
- `"webpack-env"` is removed from `types`.
- `"vite/client"` is added to `types`.
- `target` is updated from `"es5"` to `"ESNext"`.
- `moduleResolution` is updated to `"bundler"` (preferred for Vite + TypeScript 5).
- TypeScript compilation has no new errors.

**Todo List**  
1. In `tsconfig.json`, change `"target"` from `"es5"` to `"ESNext"`.
2. Remove `"webpack-env"` from the `types` array; add `"vite/client"`.
3. Change `"moduleResolution"` from `"node"` to `"bundler"`.
4. Remove `"importHelpers": true` (was needed for `tslib` with babel; not needed in Vite).

**Relevant Context**  
- [`tsconfig.json`](tsconfig.json)

**Status** `[x] done`

---

### 5. Fix source-code webpack-isms

**Intent**  
Two small patterns in the application source are webpack-specific and must be updated for Vite.

1. **SCSS tilde import** — `@import "~@mdi/font/..."` uses webpack's `~` loader prefix; Vite resolves node modules without it.
2. **Webpack magic comment** — `/* webpackChunkName: "about" */` in the router is harmless but dead code; remove it for cleanliness.

**Expected Outcomes**  
- `src/App.vue` SCSS block imports `@mdi/font` without the `~` prefix.
- `src/router/index.ts` dynamic import no longer contains the `webpackChunkName` comment.
- The app builds without SCSS resolution errors.

**Todo List**  
1. In [`src/App.vue`](src/App.vue:35), change `@import "~@mdi/font/css/materialdesignicons.css";` to `@import "@mdi/font/css/materialdesignicons.css";`.
2. In [`src/router/index.ts`](src/router/index.ts:17), remove `/* webpackChunkName: "about" */` from the dynamic import.

**Relevant Context**  
- [`src/App.vue`](src/App.vue)
- [`src/router/index.ts`](src/router/index.ts)

**Status** `[x] done`

---

### 6. Add a second unit test case

**Intent**  
Add a simple unit test for `Home.vue` to `tests/unit/example.spec.ts`, increasing coverage and confirming the Vitest setup can render a component that uses `vuex` store data.

**Expected Outcomes**  
- `tests/unit/example.spec.ts` contains tests for both `About.vue` and `Home.vue`.
- Both tests pass under `vitest run`.
- The new test uses `shallowMount` (consistent with the existing test) and checks a known piece of static text rendered by `Home.vue`.

**Todo List**  
1. In [`tests/unit/example.spec.ts`](tests/unit/example.spec.ts), add a second `describe` block for `Home.vue` that:
   - Imports `Home` from `@/views/Home.vue`
   - Uses `shallowMount` with a stub for `o-table` and `o-notification` (since Oruga components are not registered in unit tests)
   - Asserts the heading text `"Indonesia Operating System List"` is present in the output.

**Relevant Context**  
- [`tests/unit/example.spec.ts`](tests/unit/example.spec.ts)
- [`src/views/Home.vue`](src/views/Home.vue)
- [`src/views/home.ts`](src/views/home.ts)

**Status** `[x] done`

---

### 7. Clean up Cypress e2e plugin shim

**Intent**  
The `tests/e2e/plugins/index.js` file existed only to bridge webpack configuration into Cypress. With Vite, there is no webpack config to reference, so the `setupNodeEvents` call in `cypress.config.ts` can be removed.

**Expected Outcomes**  
- `cypress.config.ts` no longer calls `require('./tests/e2e/plugins/index.js')`.
- The e2e Cypress spec (`tests/e2e/specs/index.cy.js`) can still run when a dev server is up.
- `tests/e2e/plugins/index.js` is deleted as it is unreferenced.

**Todo List**  
1. In `cypress.config.ts`, remove the `setupNodeEvents` block from the `e2e` config object.
2. Delete `tests/e2e/plugins/index.js`.

**Relevant Context**  
- [`cypress.config.ts`](cypress.config.ts)
- [`tests/e2e/plugins/index.js`](tests/e2e/plugins/index.js)

**Status** `[x] done`

---

### 8. Verify build and tests

**Intent**  
Confirm that the migration is complete and nothing is broken: the app builds, unit tests pass, and the dev server starts.

**Expected Outcomes**  
- `yarn build` completes without errors.
- `yarn test:unit` reports all tests passing (both `About.vue` and `Home.vue` specs).
- `yarn dev` starts the dev server without errors.

**Todo List**  
1. Run `yarn install` to ensure the lock-file is updated with the new dependencies.
2. Run `yarn build` and confirm no errors.
3. Run `yarn test:unit` and confirm both specs pass.
4. Run `yarn dev` and confirm the dev server starts on localhost.
5. Fix any remaining issues surfaced by the above commands.

**Relevant Context**  
- All previously edited files

**Status** `[x] done`
