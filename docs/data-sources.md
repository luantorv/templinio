# Data source policy

Every source integration must record its provider, canonical record URL, retrieval timestamp,
license identifier, and license URL. Those fields describe the source record; they do not
relicense third-party material.

## endoflife.date catalog

Phase 1 integrates the bounded product list in `data/catalog.json` through documented v1 product
endpoints such as `https://endoflife.date/api/v1/products/nodejs/`. The list is deliberately
curated rather than mirroring the provider's complete catalog.

The API describes itself as MIT licensed and documents forward-compatible behavior within v1.
Clients must follow redirects, tolerate new fields and enum values, and handle `429` and temporary
hosting errors. The API is marked beta, so the recorded source fixture protects tests from network
and upstream changes.

Templinio republishes only a normalized subset of lifecycle facts and attribution. It does not
copy provider icons, upstream descriptions, identifiers, or the complete catalog. Descriptions
are maintained as original text in the local catalog configuration, and linked official policies
remain external. API v1.2.1 and its MIT notice were rechecked on 2026-11-26; the terms must be
rechecked before adding another provider or materially expanding the fields retained.

The ETL performs at most four product requests concurrently. A failed request, missing configured
product, invalid reference, or duplicate identifier stops the batch before publication. Product
snapshots are atomically replaced first and the aggregate `catalog.json` is replaced last; the
web build consumes only that aggregate.

References:

- <https://endoflife.date/docs/api/v1/>
- <https://github.com/endoflife-date/endoflife.date/blob/master/LICENSE>
- <https://github.com/endoflife-date/endoflife.date/blob/master/CHANGELOG_API.md>

## Adding a source

Before integration, document:

1. API/data license and attribution requirements.
2. Whether normalized snapshots may be redistributed.
3. Rate limits, caching rules, CORS behavior, and expected failure codes.
4. Stable identity and date semantics, including unknown and future values.
5. A bounded fixture and removal procedure.

If redistribution is unclear, keep the integration local or link to the source instead of
publishing its records.
