# Vue 3 + i18n + Typescript + Vite + TailwindCSS + ESLint + Prettier

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Add translations to locales files

Translations are ready to go with [vue-i18](https://vue-i18n.intlify.dev/) Add your files to `/locales` and are you are set.

## ESLint

Change your config at `.eslintrc.js`

## Prettier

Change config at `.prettierrc`

## Scripts

```js
yarn install // installs packages
yarn run dev // starts the dev server
yarn run tailwind // starts the tailwind config preview server
yarn run build // run build
yarn run dev // preview build
yarn run serve // preview build
yarn run serve_docker // preview build on custom port
yarn run lint // lint and fix all files
yarn run format // run prettier on all files
```

## (Local) Deployment

Copy example.env to .env and set version and IPs (for local nginx)

```make
make pre-commit # format project
make build # build docker
make build-dev # build development docker
make serve-dev # serve development docker on given IP in .env
make build-local # build development docker
make serve-local # serve development docker on given IP in .env in host mode
```

## Recommended IDE Setup

-   [VSCode](https://code.visualstudio.com/) + [volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
