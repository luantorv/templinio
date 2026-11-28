# Atlas data contract

Atlas publishes the same validated snapshot in JSON and Markdown. JSON is the normative format;
Markdown is a deterministic projection for reading and text-oriented tools.

## Discovery

- `/datasets/catalog.json` and `/datasets/catalog.md` contain the complete curated catalog.
- `/datasets/{technology-id}.json` and `.md` contain one technology.
- `/schemas/templinio.schema.json` exposes the JSON Schema for independent validation.
- `/llms.txt` lists canonical resources and the minimum temporal semantics an agent must preserve.

## Version 0.2.0

The root `schemaVersion` identifies the wire contract. Version `0.2.0` adds explicit policy labels,
LTS start, active-support end, extended-support end, maintenance state, and support-stage status.
Consumers must reject unsupported versions rather than silently reinterpret fields.

Dates are ISO 8601 calendar dates. `null` means unknown unless the associated support status is
`not-applicable`. An event date carries one of `occurred`, `scheduled`, `estimated`, or `unknown`;
a scheduled date is sourced but is not guaranteed to happen.

Entity references use stable lowercase identifiers. Every factual entity references at least one
source, and every source records its retrieval timestamp, URL, and license metadata.

## Limits

The catalog is curated, not exhaustive. It retains a normalized subset of endoflife.date rather
than mirroring the provider. Policy labels describe the stages published by the source, but do not
model commercial eligibility, compatibility, or security posture.
