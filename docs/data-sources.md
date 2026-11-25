# Data source policy

Every source integration must record its provider, canonical record URL, retrieval timestamp,
license identifier, and license URL. Those fields describe the source record; they do not
relicense third-party material.

## endoflife.date pilot

Phase 0 integrates one product from the documented v1 endpoint:
`https://endoflife.date/api/v1/products/nodejs/`.

The API describes itself as MIT licensed and documents forward-compatible behavior within v1.
Clients must follow redirects, tolerate new fields and enum values, and handle `429` and temporary
hosting errors. The API is marked beta, so the recorded source fixture protects tests from network
and upstream changes.

Templinio republishes only a normalized subset of lifecycle facts and attribution. It does not
copy provider icons, Wikipedia-derived descriptions, or the complete upstream catalog. Linked
official policies remain external. This pilot supports redistribution of the selected API data
under the provider's current MIT notice; the terms must be rechecked before expanding scope.

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
