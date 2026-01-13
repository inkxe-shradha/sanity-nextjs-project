# sanity-nextjs-project

Monorepo with a Next.js portfolio site and a Sanity Studio for content.

## Structure

- [nextjs-portfolio](nextjs-portfolio/) — Next.js TypeScript app  
  - Key files:
    - [nextjs-portfolio/package.json](nextjs-portfolio/package.json)
    - [nextjs-portfolio/next.config.ts](nextjs-portfolio/next.config.ts)
    - [nextjs-portfolio/tsconfig.json](nextjs-portfolio/tsconfig.json)
    - [nextjs-portfolio/src/app/layout.tsx](nextjs-portfolio/src/app/layout.tsx)
    - [nextjs-portfolio/src/app/page.tsx](nextjs-portfolio/src/app/page.tsx)
    - [nextjs-portfolio/src/app/globals.css](nextjs-portfolio/src/app/globals.css)

- [studio-portfolio](studio-portfolio/) — Sanity Studio (content schemas & CLI)  
  - Key files:
    - [studio-portfolio/package.json](studio-portfolio/package.json)
    - [studio-portfolio/sanity.config.ts](studio-portfolio/sanity.config.ts)
    - [studio-portfolio/sanity.cli.ts](studio-portfolio/sanity.cli.ts)
    - Schema sources:
      - [`schemaTypes`](studio-portfolio/schemaTypes/index.ts) — exports your schema array
      - [`postType`](studio-portfolio/schemaTypes/postTypes.ts) — `post` schema (title, slug, publishedAt, image, body)

- [static](static/) — static assets (contains .gitkeep)

## What this repository contains

- A Next.js app prepared for a portfolio in [nextjs-portfolio/](nextjs-portfolio).
- A Sanity Studio in [studio-portfolio/](studio-portfolio) with a sample `post` schema:
  - See [`postType`](studio-portfolio/schemaTypes/postTypes.ts) and the export in [`schemaTypes`](studio-portfolio/schemaTypes/index.ts).

## Getting started

Prerequisites:
- Node.js (recommended LTS)
- npm or yarn
- Sanity CLI (optional; the studio may provide scripts in its package.json)

Typical local workflow:

1. Install dependencies for both projects:
   - nextjs:  
     cd nextjs-portfolio && npm install
   - studio:  
     cd studio-portfolio && npm install

2. Start local dev servers (check each package.json for exact scripts):  
   - See scripts in [nextjs-portfolio/package.json](nextjs-portfolio/package.json) and [studio-portfolio/package.json](studio-portfolio/package.json).

3. Edit schemas in the Sanity studio:  
   - Modify or extend [`postType`](studio-portfolio/schemaTypes/postTypes.ts) and update the export in [`schemaTypes`](studio-portfolio/schemaTypes/index.ts).

4. Update the Next.js app pages/components in [nextjs-portfolio/src/app/](nextjs-portfolio/src/app/).

## Build & Deploy

- Next.js build/process: use scripts in [nextjs-portfolio/package.json](nextjs-portfolio/package.json). See [nextjs-portfolio/next.config.ts](nextjs-portfolio/next.config.ts) for custom config.
- Sanity deploy: follow Sanity docs or check [studio-portfolio/sanity.cli.ts](studio-portfolio/sanity.cli.ts) and the studio package.json scripts.

## Useful links in the repo

- [nextjs-portfolio/package.json](nextjs-portfolio/package.json)  
- [nextjs-portfolio/next.config.ts](nextjs-portfolio/next.config.ts)  
- [nextjs-portfolio/src/app/layout.tsx](nextjs-portfolio/src/app/layout.tsx)  
- [nextjs-portfolio/src/app/page.tsx](nextjs-portfolio/src/app/page.tsx)  
- [studio-portfolio/package.json](studio-portfolio/package.json)  
- [studio-portfolio/sanity.config.ts](studio-portfolio/sanity.config.ts)  
- [studio-portfolio/sanity.cli.ts](studio-portfolio/sanity.cli.ts)  
- [`schemaTypes`](studio-portfolio/schemaTypes/index.ts)  
- [`postType`](studio-portfolio/schemaTypes/postTypes.ts)

## Notes

- This README provides a high-level onboarding. For exact commands and scripts, open the package.json files linked above.
- To extend content types, edit the schema files in [studio-portfolio/schemaTypes/](studio-portfolio/schemaTypes/).
