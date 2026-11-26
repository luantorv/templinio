# Templinio

> Understand the past. Navigate the present. Plan the future.

Templinio is an open software lifecycle atlas. It is being built to make releases, support
windows, end-of-life dates, relationships, and security evidence easier to explore without
hiding uncertainty or provenance.

The repository is currently building **Atlas (v0.1)**. The site publishes a searchable catalog
of 15 technologies as static pages, with lifecycle records linked to their sources. Timeline and
additional machine-readable formats are still in progress.

## What exists today

- A statically exported Next.js 16 application with the Templinio Design System's Midnight and
  Ivory themes.
- A versioned Zod and JSON Schema contract for `Technology`, `ReleaseCycle`, `Event`, and `Source`.
- A dependency-free Python ETL that reads a curated set from the endoflife.date v1 API,
  normalizes its temporal states, validates references, and publishes product and aggregate
  snapshots atomically.
- Fixtures for occurred, scheduled, and unknown dates.
- One command for linting, type checks, tests, data validation, and the production build.

## Local development

The supported environment is defined by `flake.nix` (Node.js 24, Python 3.13, Ruff, and uv):

```sh
nix develop
npm ci
npm run check
npm run dev
```

Without Nix, install Node.js 24, Python 3.13, and Ruff 0.17.4 before running the same npm
commands. The development server is available at `http://localhost:3000`.

Useful commands:

```sh
npm run etl:fixture  # rebuild the stable domain fixture from its recorded API response
npm run etl:catalog  # fetch and publish the configured 15-product Atlas catalog
npm run validate:data
npm run build        # static output: apps/web/out
```

The networked catalog command fetches only the products listed in `data/catalog.json`. It
validates every product and the aggregate before publishing individual files, then replaces
`catalog.json` last so the site keeps its previous valid snapshot if an earlier step fails.

## Repository map

```text
apps/web/                 Static web application and public snapshots
packages/schema/          Runtime schema, inferred TypeScript types, and tests
pipelines/templinio_etl/  Extraction, normalization, validation, atomic publication
data/catalog.json         Curated Atlas product list and original descriptions
data/fixtures/            Stable source and domain fixtures
data/schemas/             Public JSON Schema
docs/                     Architecture, sources, operations, and public roadmap
```

Start with [the architecture](docs/architecture.md), [source policy](docs/data-sources.md), and
[privacy and operating budget](docs/privacy-and-operations.md). The preliminary availability
review and launch caveats for the name are documented in [naming](docs/naming.md).

## Data and privacy

The lifecycle snapshots are derived from the endoflife.date v1 API and retain provider,
retrieval time, license, and source URL. Product descriptions in `data/catalog.json` are original
Templinio text. A source's license is not automatically applied to unrelated datasets.
Templinio currently has no accounts, analytics, cookies, server functions, or user uploads.

## Contributing

Contributions are welcome under the process in [CONTRIBUTING.md](CONTRIBUTING.md). No Contributor
License Agreement is required. Please report security issues through the private process in
[SECURITY.md](SECURITY.md).

## License and credits

Original Templinio code and documentation are licensed under
[GNU AGPL v3.0 only](LICENSE). Third-party software, fonts, and data retain their own licenses;
see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

Created and maintained by [@luantorv](https://github.com/luantorv). A LinkedIn credit can be added
when its canonical URL is provided.
