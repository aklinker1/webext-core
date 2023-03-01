# Contributing

Here you'll find everything you need to know about contributing to the project.

[[toc]]

:::info First time contributing to open source?
It's easy! Here are some resources to get started:

- https://www.youtube.com/embed/dSl_qnWO104
- https://docs.github.com/en/get-started/quickstart/contributing-to-projects

:::

## Contibutors

Special thanks to all the contributors. I look forward to seeing you in the list!

<ClientOnly>
    <ContributorList />
</ClientOnly>

## Project Goals

The goal of `webext-core` is to create useful, targetted, quality utilities for creating and publishing web extensions. Not just _Chrome_ extensions, but web extensions that work on all browsers, for all manifest versions.

With that in mind, there's a couple of expectations I have around new code:

- Code is written in TypeScript and packages provide great TypeScript support.
- Fully unit tested. I won't require 100% coverage, but it should be close.
- Utilities support all browsers.

If you're just fixing a bug or improving the docs, feel free to open a PR!

If you want to create a new package, open an issue first. That way we can collaborate and make sure it fits the purpose listed above. If it's not something I want to maintain or it doesn't fit this project, I don't want you to have wasted time working on it. We all have lives to live :smiley:

## Development Setup

You'll need to install some tools:

- [NodeJS](https://nodejs.org/en/), v16 or above
- [PNPM](https://pnpm.io/): Install it via `corepack enable`

Then you can fork the repo, install the dependencies, and build the packages for the first time!

```sh
git clone <your-forl>
cd webext-core
pnpm i
pnpm build
```

## Project Layout

The `webext-core` repo is a monorepo containing all the packages under the [`@webext-core` scope](https://www.npmjs.com/search?q=%40webext-core).

Here's an overview of the main directories:

- `docs`: The [`vitepress`](https://vitepress.vuejs.org/) website for <https://webext-core.aklinker1.io>
- `packages/*`: Each NPM package has it's own directory
- `packages/*-demo`: Some packages have a demo extension

Each package's README (`packages/*/README.md`) will have additional details for setting up or testing the package.

In general, all packages are the same.

- They all have a `README.md` with additional documentation
- They all use `src/index.ts` as the entrypoint
- They all use `tsup` for building the final package for NPM
- They're all written in TypeScript
- They all share the same basic scripts for common tasks

### Scripts

In the root directory, you can run the following scripts:

```sh
pnpm build  # Run the build script for all packages
pnpm docs   # Run the docs website locally
pnpm format # Run prettier to format all your files
```

Or `cd` into a package's directory and run these scripts

```sh
pnpm build   # Build the package and it's dependencies
pnpm compile # Check for type errors
pnpm test    # Run unit tests in watch mode
```

Each directory might have additional scripts you can run. See each `package.json` for a complete list.
