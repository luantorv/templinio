# Foundation architecture

Templinio is static-first. The Phase 0 path is intentionally short:

```text
endoflife.date v1 or recorded fixture
              ↓
Python extraction → normalization → dependency-free validation
              ↓                         ↓
       atomic JSON snapshot       last valid file survives failure
              ↓
Next.js static build ← shared Zod schema + stable fixture
              ↓
        portable `out/` directory
```

## Boundaries

- `packages/schema` owns the browser/runtime contract and referential checks used by TypeScript.
- `data/schemas` exposes the same initial wire contract to consumers that do not use TypeScript.
- `pipelines/templinio_etl` does not import application code and uses only Python's standard
  library. It validates before an atomic `os.replace`, so a partial write cannot become public.
- `apps/web` reads a committed fixture at build time. It has no server functions or database.

The Python validator deliberately duplicates a small set of invariants from the Zod schema. This
keeps publication independent from Node.js while cross-language fixture tests reveal drift.

## Temporal semantics

A missing date is `null` and its event is explicitly `unknown`. A future date from a source is
`scheduled`, not guaranteed. `estimated` is reserved for sources that explicitly characterize a
date as an estimate. Templinio does not infer support stages that a provider does not publish.

## Failure behavior

Network, decoding, normalization, or validation errors stop before publication. The previously
published snapshot remains untouched. The API client uses a finite timeout and a fixed HTTPS
origin; retries and scheduled updates will be added only with measured source limits in Atlas.
