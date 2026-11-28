# Templinio Atlas lifecycle data

A source-backed, machine-readable view of software release and support lifecycles.

- Schema: `0.2.0`
- Generated: `2026-11-27T09:23:11+00:00`
- Unknown values are preserved; missing support stages are not inferred.

## MySQL

Open-source relational database management system.

- Identifier: `mysql`
- Active support stage: Premier Support
- Lifecycle/EOL stage: Extended Support
- Extended support stage: Unknown
- Release policy: https://www.oracle.com/us/support/library/lifetime-support-technology-069183.pdf

| Cycle | Released | LTS starts | Active support ends | EOL | Extended support ends | Maintained | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 26.10 | 2026-10-20 | Unknown | Unknown | Unknown | Unknown | Yes | active |
| 26.7 | 2026-07-28 | Unknown | 2026-10-20 | 2026-10-20 | Unknown | No | end-of-life |
| 9.7 | 2026-04-21 | Unknown | 2031-04-30 | 2034-04-30 | Unknown | Yes | active |
| 9.6 | 2026-01-20 | Unknown | 2026-04-21 | 2026-04-21 | Unknown | No | end-of-life |
| 9.5 | 2025-10-21 | Unknown | 2026-01-20 | 2026-01-20 | Unknown | No | end-of-life |
| 9.4 | 2025-07-22 | Unknown | 2025-10-21 | 2025-10-21 | Unknown | No | end-of-life |
| 9.3 | 2025-04-15 | Unknown | 2025-07-22 | 2025-07-22 | Unknown | No | end-of-life |
| 9.2 | 2025-01-21 | Unknown | 2025-04-15 | 2025-04-15 | Unknown | No | end-of-life |
| 9.1 | 2024-10-15 | Unknown | 2025-01-21 | 2025-01-21 | Unknown | No | end-of-life |
| 9.0 | 2024-07-01 | Unknown | 2024-10-15 | 2024-10-15 | Unknown | No | end-of-life |
| 8.4 | 2024-04-30 | Unknown | 2029-04-30 | 2032-04-30 | Unknown | Yes | active |
| 8.3 | 2024-01-16 | Unknown | 2024-04-30 | 2024-04-30 | Unknown | No | end-of-life |
| 8.2 | 2023-10-25 | Unknown | 2024-01-16 | 2024-01-16 | Unknown | No | end-of-life |
| 8.1 | 2023-07-18 | Unknown | 2023-10-25 | 2023-10-25 | Unknown | No | end-of-life |
| 8.0 | 2018-04-19 | 2023-07-18 | 2025-04-30 | 2026-04-30 | Unknown | No | end-of-life |
| 5.7 | 2015-10-09 | Unknown | 2020-10-31 | 2023-10-31 | Unknown | No | end-of-life |
| 5.6 | 2013-02-01 | Unknown | 2018-02-28 | 2021-02-28 | Unknown | No | end-of-life |
| 5.5 | 2010-12-03 | Unknown | 2015-12-31 | 2018-12-31 | Unknown | No | end-of-life |
| 5.1 | 2008-12-08 | Unknown | 2013-12-31 | 2013-12-31 | Unknown | No | end-of-life |
| 5.0 | 2005-10-24 | Unknown | 2011-12-31 | 2011-12-31 | Unknown | No | end-of-life |
| 4.1 | 2004-10-23 | Unknown | 2006-12-31 | 2009-12-31 | Unknown | No | end-of-life |
| 4.0 | 2003-03-15 | Unknown | 2006-09-30 | 2008-09-30 | Unknown | No | end-of-life |
| 3.23 | 2001-01-17 | Unknown | 2006-07-31 | 2006-12-31 | Unknown | No | end-of-life |

## Sources

- [endoflife.date — MySQL](https://endoflife.date/mysql) — retrieved 2026-11-27T09:23:11+00:00; license [MIT](https://github.com/endoflife-date/endoflife.date/blob/master/LICENSE)

## Limitations

Templinio republishes a curated subset of upstream lifecycle facts. Dates can change,
commercial support may require separate eligibility, and absence of a published date is
not evidence that support exists. Verify consequential decisions against the linked source.
