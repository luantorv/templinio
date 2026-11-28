# Atlas architecture

Templinio is static-first. Atlas extends the Foundation path without adding a runtime service:

```text
curated product config → endoflife.date v1 product responses
                                  ↓
                normalization → per-product validation
                                  ↓
                    aggregate + reference validation
                                  ↓
       atomic product JSON/Markdown → aggregate JSON published last
                                  ↓
        Next.js static build ← shared Zod schema at build time
                                  ↓
     catalog + technology/cycle pages + resources + portable `out/`
```

## Boundaries

- `packages/schema` owns the browser/runtime contract and referential checks used by TypeScript.
- `data/schemas` owns the canonical JSON Schema; CI checks that the deployed copy under
  `/schemas` is identical.
- `pipelines/templinio_etl` does not import application code and uses only Python's standard
  library. It validates before an atomic `os.replace`, so a partial write cannot become public.
- `data/catalog.json` bounds the products fetched and owns original short descriptions.
- `apps/web` reads the committed aggregate snapshot at build time. It has no server functions or
  database, and visitors never call the source API.

The Python validator deliberately duplicates a small set of invariants from the Zod schema. This
keeps publication independent from Node.js while cross-language fixture tests reveal drift.

## Temporal semantics

A missing date is `null` and its event is explicitly `unknown`. A future date from a source is
`scheduled`, not guaranteed. `estimated` is reserved for sources that explicitly characterize a
date as an estimate. `not-applicable` means the provider does not define that support stage for
the cycle; `unknown` means it cannot be established. Templinio does not infer support stages that
a provider does not publish.

## Failure behavior

Network, decoding, normalization, or validation errors stop before publication. Each file uses an
atomic replacement; the aggregate consumed by the site is published only after every individual
snapshot succeeds. The API client uses a finite timeout, a fixed HTTPS origin, bounded concurrency,
and capped exponential retries for rate limits and transient network or hosting failures. Permanent
HTTP errors fail immediately.

A weekly GitHub Actions job starts from `staging`, runs the complete ETL and repository check, then
updates a dedicated branch and opens a pull request. It never writes directly to `staging` or
`main`, so the committed snapshot remains the last reviewed valid publication. The web client
shows a freshness warning once that snapshot is 14 days old, including when no redeploy occurred.
