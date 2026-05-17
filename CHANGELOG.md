# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2026-05-17

### Added

- `CLAUDE.md` with project-specific Claude Code guidelines
- `SECURITY.md` with private vulnerability disclosure policy (GitHub Security Advisories)
- `CONTRIBUTING.md` with fork/branch/commit/PR contribution workflow
- GitHub issue templates: bug report, feature request, security vulnerability
- GitHub PR template
- `workflow_dispatch` trigger on CI workflow for manual runs

### Changed

- Minimum Node.js engine bumped from `>=10` to `>=22` LTS
- `.nvmrc` updated from `v15.10.0` to `v22`
- `jest` upgraded ^27 → ^29, `@types/jest` ^26 → ^29
- `rollup` upgraded ^2 → ^4, `@rollup/plugin-commonjs` ^19 → ^29
- `rimraf` upgraded ^3 → ^6
- `standard` upgraded ^16 → ^17
- `@psenger/markdown-fences` upgraded ^1.0.1 → ^1.2.0
- CI matrix updated from Node 15.x to Node 22.x and 24.x
- `actions/checkout` and `actions/setup-node` upgraded to v6
- Coverage upload migrated from deprecated `codecov` CLI to `codecov/codecov-action@v4`
- README rewritten: centered header, live CI/npm/node/license badges, improved description, development section, closing footer

### Removed

- `codecov` CLI devDependency (deprecated; replaced by CI action)
- Internal deployment notes from README (moved out of public documentation)

## [1.1.2] - 2021-08-11

- Initial tracked release

[unreleased]: https://github.com/psenger/multivalue-map/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/psenger/multivalue-map/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/psenger/multivalue-map/releases/tag/v1.1.2
