# Atlas architecture

Templinio is static-first. Atlas extends the Foundation path without adding a runtime service:

```text
curated product config → endoflife.date v1 product responses
                                  ↓
                normalization → per-product validation
                                  ↓
                    aggregate + reference validation
                                  ↓
          atomic product JSON → aggregate JSON published last
                                  ↓
        Next.js static build ← shared Zod schema at build time
                                  ↓
           catalog + technology pages + portable `out/`
```

## Boundaries

- `packages/schema` owns the browser/runtime contract and referential checks used by TypeScript.
- `data/schemas` exposes the same initial wire contract to consumers that do not use TypeScript.
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
date as an estimate. Templinio does not infer support stages that a provider does not publish.

## Failure behavior

Network, decoding, normalization, or validation errors stop before publication. Each file uses an
atomic replacement; the aggregate consumed by the site is published only after every individual
snapshot succeeds. The API client uses a finite timeout, a fixed HTTPS origin, and bounded
concurrency. Retries and scheduled updates remain separate work so their failure policy can be
tested explicitly.
