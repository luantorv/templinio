# Templinio Atlas lifecycle data

A source-backed, machine-readable view of software release and support lifecycles.

- Schema: `0.2.0`
- Generated: `2026-11-27T09:23:11+00:00`
- Unknown values are preserved; missing support stages are not inferred.

## Kubernetes

Open-source system for orchestrating containerized applications.

- Identifier: `kubernetes`
- Active support stage: Active Support
- Lifecycle/EOL stage: Maintenance Support
- Extended support stage: Unknown
- Release policy: https://kubernetes.io/releases/patch-releases/

| Cycle | Released | LTS starts | Active support ends | EOL | Extended support ends | Maintained | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1.37 | 2026-08-26 | Unknown | 2027-08-28 | 2027-10-28 | Unknown | Yes | active |
| 1.36 | 2026-04-22 | Unknown | 2027-04-28 | 2027-06-28 | Unknown | Yes | active |
| 1.35 | 2025-12-17 | Unknown | 2026-12-28 | 2027-02-28 | Unknown | Yes | active |
| 1.34 | 2025-08-27 | Unknown | 2026-08-27 | 2026-10-27 | Unknown | No | end-of-life |
| 1.33 | 2025-04-23 | Unknown | 2026-04-28 | 2026-06-28 | Unknown | No | end-of-life |
| 1.32 | 2024-12-11 | Unknown | 2025-12-28 | 2026-02-28 | Unknown | No | end-of-life |
| 1.31 | 2024-08-13 | Unknown | 2025-08-28 | 2025-11-11 | Unknown | No | end-of-life |
| 1.30 | 2024-04-17 | Unknown | 2025-04-28 | 2025-07-15 | Unknown | No | end-of-life |
| 1.29 | 2023-12-13 | Unknown | 2024-12-28 | 2025-02-28 | Unknown | No | end-of-life |
| 1.28 | 2023-08-15 | Unknown | 2024-08-28 | 2024-10-28 | Unknown | No | end-of-life |
| 1.27 | 2023-04-11 | Unknown | 2024-04-28 | 2024-06-28 | Unknown | No | end-of-life |
| 1.26 | 2022-12-08 | Unknown | 2023-12-28 | 2024-02-28 | Unknown | No | end-of-life |
| 1.25 | 2022-08-23 | Unknown | 2023-08-27 | 2023-10-27 | Unknown | No | end-of-life |
| 1.24 | 2022-05-03 | Unknown | 2023-05-28 | 2023-07-28 | Unknown | No | end-of-life |
| 1.23 | 2021-12-07 | Unknown | 2022-12-28 | 2023-02-28 | Unknown | No | end-of-life |
| 1.22 | 2021-08-04 | Unknown | 2022-08-28 | 2022-10-28 | Unknown | No | end-of-life |
| 1.21 | 2021-04-08 | Unknown | 2022-04-28 | 2022-06-28 | Unknown | No | end-of-life |
| 1.20 | 2020-12-08 | Unknown | 2021-12-28 | 2022-02-28 | Unknown | No | end-of-life |
| 1.19 | 2020-08-26 | Unknown | 2021-08-28 | 2021-10-28 | Unknown | No | end-of-life |
| 1.18 | 2020-03-25 | Unknown | 2021-04-28 | 2021-06-18 | Unknown | No | end-of-life |
| 1.17 | 2019-12-07 | Unknown | Unknown | 2020-12-25 | Unknown | No | end-of-life |
| 1.16 | 2019-09-18 | Unknown | Unknown | 2020-08-04 | Unknown | No | end-of-life |

## Sources

- [endoflife.date — Kubernetes](https://endoflife.date/kubernetes) — retrieved 2026-11-27T09:23:11+00:00; license [MIT](https://github.com/endoflife-date/endoflife.date/blob/master/LICENSE)

## Limitations

Templinio republishes a curated subset of upstream lifecycle facts. Dates can change,
commercial support may require separate eligibility, and absence of a published date is
not evidence that support exists. Verify consequential decisions against the linked source.
