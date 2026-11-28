# Templinio Atlas lifecycle data

A source-backed, machine-readable view of software release and support lifecycles.

- Schema: `0.2.0`
- Generated: `2026-11-28T00:08:17+00:00`
- Unknown values are preserved; missing support stages are not inferred.

## Redis

In-memory data store used for caching, messaging, and persistence.

- Identifier: `redis`
- Active support stage: Active Support
- Lifecycle/EOL stage: Security Support
- Extended support stage: Unknown
- Release policy: https://redis.io/docs/latest/operate/oss_and_stack/install/version-mgmt/

| Cycle | Released | LTS starts | Active support ends | EOL | Extended support ends | Maintained | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 8.12 | 2026-11-22 | Unknown | Unknown | Unknown | Unknown | Yes | active |
| 8.10 | 2026-07-29 | Unknown | 2026-11-22 | Unknown | Unknown | Yes | active |
| 8.8 | 2026-05-25 | Unknown | 2026-07-29 | 2027-01-29 | Unknown | Yes | active |
| 8.6 | 2026-02-11 | Unknown | 2026-05-25 | 2026-11-25 | Unknown | No | end-of-life |
| 8.4 | 2025-11-18 | Unknown | 2026-02-11 | 2026-08-10 | Unknown | No | end-of-life |
| 8.2 | 2025-08-04 | Unknown | 2025-11-18 | 2030-09-01 | Unknown | Yes | active |
| 8.0 | 2025-05-02 | Unknown | 2025-08-04 | 2026-12-01 | Unknown | Yes | active |
| 7.4 | 2024-07-29 | Unknown | 2025-05-02 | 2029-12-01 | Unknown | Yes | active |
| 7.2 | 2023-08-15 | Unknown | 2024-07-29 | 2029-12-01 | Unknown | Yes | active |
| 7.0 | 2022-04-27 | Unknown | 2023-08-15 | 2024-07-29 | Unknown | No | end-of-life |
| 6.2 | 2021-02-22 | Unknown | 2022-04-27 | 2027-04-01 | Unknown | Yes | active |
| 6.0 | 2020-04-30 | Unknown | 2021-02-22 | 2022-05-31 | Unknown | No | end-of-life |
| 5.0 | 2018-10-17 | Unknown | 2020-04-30 | 2022-04-27 | Unknown | No | end-of-life |

## Sources

- [endoflife.date — Redis](https://endoflife.date/redis) — retrieved 2026-11-28T00:08:17+00:00; license [MIT](https://github.com/endoflife-date/endoflife.date/blob/master/LICENSE)

## Limitations

Templinio republishes a curated subset of upstream lifecycle facts. Dates can change,
commercial support may require separate eligibility, and absence of a published date is
not evidence that support exists. Verify consequential decisions against the linked source.
