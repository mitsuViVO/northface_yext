# Yext Pages CLI | Yext Hitchhikers Platform

The Yext CLI has a command group called `pages` that makes it easy to manage a site locally. This group of commands can be used to simulate the build, generation, and serving process that Pages performs in a local dev environment.

These commands also help pull data from your Content locally, so you can develop from a subset of your Content data.

## The Commands

### `yext pages new`

The `new` command initiates an on-boarding flow to help set up a Pages project. The command walks through cloning starters, setting up remote GitHub repositories, and other steps that are required to build with Pages.

This is the first command you should run when beginning a new project.

### `yext pages build`

The `build` command triggers a local build, which under the hood, invokes `vite build`. PagesJS is powered by Vite, a modern and performant build tool.

This command will generate a `.artifacts-output` and `dist` directory at the root of your project.

### `yext pages deploy [flags]`

The `deploy` command creates deployments for the corresponding branch and commit specified.

**Flags:**

- `-b --branch`: git branch to create a deployment from
- `-c --commit`: git commit SHA to create a deployment from
- `-h --help`: help for deploy
- `-r --root`: path to the repository root where git configuration lives
- `-t --tag`: git tag to create a deployment from

### `yext pages develop [flags]`

The `develop` command builds and serves the site based on the configuration of the specified hostname. Hostname can be omitted to use the repo’s default configuration. The output directory will be created if it already does not exist.

**Flags:**

- `-h, --help`: help for develop
- `--hostname`: hostname of site to develop
- `-l, --localData`: relative path to directory with data to generate pages for (default “localData”)
- `-o, --output`: path to build output directory (default “sites-rendered-output”)
- `-p, --port`: (uint32): Port to serve at (default 8000)
- `-r, --root`: path to the repo root directory

### `yext pages generate [flags]`

The `generate` command builds and generates the site based on the configuration of the specified hostname. Hostname can be omitted to use the repo’s default configuration.

The output directory will be created if it already does not exist.

**Flags:**

- `-h, --help`: help for generate
- `--hostname`: hostname of site to build
- `-l, --localData`: relative path to directory with data to generate pages for (default “localData”)
- `-o, --output`: path to build output directory (default “sites-rendered-output”)
- `-r, --root`: path to the repo root directory

### `yext pages generate-test-data [flags]`

This command generates test data, which can be used for local development.

If a `streamName` is provided, the command will generate local data files using the actual content from that `streamName`. Otherwise, dummy data will be used based on the stream names given in the provided config file. The local data directory will be created if it does not already exist.

If `featuresConfig` or `siteStreamConfig` is provided, the command will generate local data files using the provided content in place of `features.json` or `site-stream.json`, respectively.

**Flags:**

- `a, --allFields`: when true all Content fields will be included in the test data instead of being filtered to the fields in the stream
- `--entityIds`: entities to generate-test-data
- `--featureName`: feature name to generate-test-data
- `--featuresConfig`: json string to use as the `features.json` file
- `-h, --help`: help for generate-test-data
- `--hostname`: hostname of site to generate-test-data
- `--localData`: relative path to directory to write generated data to (default “localData”)
- `--locale`: locale to generate-test-data
- `-p, --printDocuments`: when true the generated test data will be printed to the console, not written to the `localData` directory
- `-r, --root`: path to the repo root directory
- `--siteStreamConfig`: json string to use as the `site-stream.json` file
- `--streamName`: streamName to fetch data from

### `yext pages serve [flags]`

The `serve` command serves the production build of your site. Note: this command will not work if you have not yet built your site locally. Run the `build`, `generate-test-data` and `generate` commands before running the `serve` command.

**Flags:**

- `f, --files`: directory of files to serve (default “sites-rendered-output”)
- `-h, --help`: help for serve
- `-p, --port`: port to serve at (default 8000)
- `-r, --root`: path to the repo root directory
