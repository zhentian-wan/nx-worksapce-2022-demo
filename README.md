# ZTWDEV

This is a learning demo with NX worksapce

## Setup a new NX worksapce project

```bash
npx create-nx-workspace ztwdev --projectManager=yarn
```

- Setup project name as `site`
- Choose `next.js` as framework
- Choose enable `Nx Cloud`

### Run the application

```bash
TAILWIND_MODE=watch yarn nx run site:serve
```

or

```bash
yarn nx serve site
```

## Add Tailwind css

```bash
yarn add tailwindcss@latest postcss@latest autoprefixer@latest
cd apps/site
npx tailwindcss init -p

```
