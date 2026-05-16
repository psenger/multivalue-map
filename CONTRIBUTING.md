# Contributing

Thank you for your interest in contributing to `@psenger/multivalue-map`.

## Prerequisites

- Node.js >= 22 (see `.nvmrc`)
- npm >= 10

## Setup

```bash
git clone https://github.com/psenger/multivalue-map.git
cd multivalue-map
nvm use        # uses .nvmrc
npm install
```

## Development Workflow

1. Fork the repository and create a branch from `dev`:
   ```bash
   git checkout -b feature/{issue-number}-brief-description
   ```
   Use `fix/` for bug fixes, `feature/` for new functionality.

2. Make your changes. Follow [StandardJS](https://standardjs.com/) style (no semicolons, 2-space indent).

3. Run the lint and test suite:
   ```bash
   npm run test:lint
   npm test
   ```
   100% test coverage is required. All tests must pass.

4. If you changed documentation or JSDoc, regenerate the README:
   ```bash
   npm run docs
   ```
   Never edit `README.md` directly — it is generated from `.README.md`.

5. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat(scope): short description

   Longer explanation of what and why (not how).

   Closes #N
   ```

6. Open a pull request against the `main` branch. Fill in the PR template.

## Reporting Bugs

Open an issue using the **Bug Report** template. For security vulnerabilities, see [SECURITY.md](SECURITY.md).

## Code of Conduct

Be respectful. Constructive criticism is welcome; personal attacks are not.
