# A&S QM Beratung – Website

Static website project for A&S QM Beratung (Andreas Strauchen) with
wireframe pages under `wireframe/` and an SCSS setup for styling.

## Requirements

- Node.js (current LTS recommended)
- npm
- Sass is pinned to a Bootstrap 5.3 compatible version to avoid deprecation warnings.

## Setup

```bash
npm install
```

## Development

Starts the SCSS watcher and a local server for `wireframe/`:

```bash
npm run dev
```

## Landing page (src/dist)

Builds the Bootstrap + SASS landing page from `src/` into `dist/`:

```bash
npm run build:site
```

Watch the SASS entrypoint for changes:

```bash
npm run dev:site
```

This runs the SASS watcher, keeps `dist/` synced from `src/`, and starts a local dev server with live reload.

Serve the compiled `dist/` folder:

```bash
npm run serve:site
```

## Build

Compiles SCSS to `wireframe/css/main.css`:

```bash
npm run build
```

## Project structure (excerpt)

- `wireframe/` – HTML pages, SCSS, and assets
- `wireframe/sass/main.scss` – entry point for styles
- `wireframe/css/main.css` – compiled styles
- `src/` – landing page source (HTML, SCSS, images, JS)
- `dist/` – compiled static output for deployment
