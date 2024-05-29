## Features

- VS Code [devcontainers](https://code.visualstudio.com/docs/devcontainers/containers) for consistent and portable development
- Semantic versioning and release via [request-please](https://github.com/google-github-actions/release-please-action) 
- Custom typesafe environment [configuration module](src/config/config.module.ts)
- Custom application [logging](src/logger/winston-logger.ts) (uses [nest-winston](https://github.com/gremo/nest-winston) and optional [winston-loki](https://github.com/JaniAnttonen/winston-loki))
- Custom [eslint](./.eslintrc.js) and [prettier](./.prettierrc.json) linting/formatting 
- Linting precommit [rules](./.husky/pre-commit) via [husky](https://github.com/typicode/husky)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Linting and formatting

```bash
# lint
$ yarn lint

# format
$ yarn format
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Using this repository as a template

On your forked repository you have to add this template repository as a remote.

```bash
git remote add template https://github.com/j3ko/nestjs-boilerplate.git
```

Then run git fetch to update the changes

```bash
git fetch --all
```

Then is possible to merge updates from this template to your repository.

```bash
git merge template/main --allow-unrelated-histories
```