# CLAUDE.md

Project-specific instructions for Claude Code.

## Project Overview

`@psenger/multivalue-map` is a lightweight ES6 Multi Value Map for Node.js. It wraps a `Map` where each key holds a collection of values (via pluggable `Collection` subclasses: `ArrayCollection` or `SetCollection`).

## Key Commands

```bash
npm test              # run jest with coverage
npm run test:lint     # lint src with StandardJS
npm run build         # rollup bundle + regenerate README
npm run docs          # regenerate README.md from .README.md template
npm run clean         # remove coverage/ and dist/
```

## Project Structure

```
src/com/cngr/multivaluemap/
  index.js            # exports MultiValuedMap, ArrayCollection, SetCollection, Collection
  index.spec.js       # jest test suite (100% coverage required)
.README.md            # README template — edit this, not README.md
build-readme.js       # drives @psenger/markdown-fences to generate README.md
rollup.config.js      # bundles src → dist/index.js (CJS)
```

## Conventions

- Code style: StandardJS (`standard`). No semicolons, 2-space indent.
- Commit style: Conventional Commits (`feat`, `fix`, `chore`, `docs`, etc.)
- Branch naming: `feature/{issue-number}-brief-description` or `fix/{issue-number}-brief-description`
- Never edit `README.md` directly — it is generated. Edit `.README.md` and run `npm run docs`.
- 100% test coverage is required. Do not reduce coverage.

## Node Version

Minimum: Node 22 LTS. See `.nvmrc` and `engines` in `package.json`.
