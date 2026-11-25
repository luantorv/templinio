# SPDX-License-Identifier: AGPL-3.0-only

"""Normalize the documented endoflife.date v1 product response."""

from __future__ import annotations

from datetime import date, datetime
from typing import Any

SOURCE_LICENSE_URL = "https://github.com/endoflife-date/endoflife.date/blob/master/LICENSE"


def _event_date_status(value: str | None, generated_on: date) -> str:
    if value is None:
        return "unknown"
    return "scheduled" if date.fromisoformat(value) > generated_on else "occurred"


def _cycle_status(release: dict[str, Any], generated_on: date) -> str:
    release_date = release.get("releaseDate")
    eol_date = release.get("eolFrom")
    if release_date and date.fromisoformat(release_date) > generated_on:
        return "scheduled"
    if release.get("isEol") is True:
        return "end-of-life" if eol_date else "unknown"
    return "active"


def _category(product: dict[str, Any]) -> str:
    tags = set(product.get("tags", []))
    if "javascript-runtime" in tags:
        return "runtime"
    category = product.get("category")
    if category in {"runtime", "language", "framework", "database", "operating-system", "tool"}:
        return category
    if category in {"os", "linux-distribution"}:
        return "operating-system"
    return "tool"


def normalize_endoflife_product(payload: dict[str, Any]) -> dict[str, Any]:
    """Convert a documented API v1 product response to the Templinio schema."""
    product = payload["result"]
    generated_at = payload["generated_at"]
    generated_on = datetime.fromisoformat(generated_at).date()
    technology_id = product["name"]
    source_id = f"endoflife-date-{technology_id}"
    source_url = product.get("links", {}).get("html", f"https://endoflife.date/{technology_id}")

    cycles: list[dict[str, Any]] = []
    events: list[dict[str, Any]] = []
    for release in product.get("releases", []):
        cycle_id = f"{technology_id}-{release['name'].lower()}"
        release_date = release.get("releaseDate")
        eol_date = release.get("eolFrom")
        cycles.append(
            {
                "id": cycle_id,
                "technologyId": technology_id,
                "name": release["name"],
                "releaseDate": release_date,
                "eolDate": eol_date,
                "isLts": release.get("isLts"),
                "status": _cycle_status(release, generated_on),
                "sourceIds": [source_id],
            }
        )
        events.append(
            {
                "id": f"{cycle_id}-release",
                "technologyId": technology_id,
                "releaseCycleId": cycle_id,
                "type": "release",
                "title": f"{product['label']} {release['name']} released",
                "date": release_date,
                "dateStatus": _event_date_status(release_date, generated_on),
                "sourceIds": [source_id],
            }
        )
        events.append(
            {
                "id": f"{cycle_id}-eol",
                "technologyId": technology_id,
                "releaseCycleId": cycle_id,
                "type": "end-of-life",
                "title": (
                    f"{product['label']} {release['name']} end of life"
                    if eol_date
                    else f"{product['label']} {release['name']} end-of-life date is unknown"
                ),
                "date": eol_date,
                "dateStatus": _event_date_status(eol_date, generated_on),
                "sourceIds": [source_id],
            }
        )

    return {
        "schemaVersion": "0.1.0",
        "generatedAt": generated_at,
        "sources": [
            {
                "id": source_id,
                "name": f"endoflife.date — {product['label']}",
                "url": source_url,
                "retrievedAt": generated_at,
                "license": "MIT",
                "licenseUrl": SOURCE_LICENSE_URL,
            }
        ],
        "technologies": [
            {
                "id": technology_id,
                "name": product["label"],
                "description": f"Lifecycle information for {product['label']}.",
                "category": _category(product),
                "homepage": product.get("links", {}).get("releasePolicy", source_url),
                "aliases": product.get("aliases", []),
                "sourceIds": [source_id],
            }
        ],
        "releaseCycles": cycles,
        "events": events,
    }
